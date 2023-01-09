import { ColorScheme } from "@mantine/core";
import { CookieValueTypes, deleteCookie, getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../components/layout/Layout";
import { ServerData } from "../components/layout/types";
import { SITE_NAME } from "../config/config";
import { AuthProvider, User } from "../contexts/AuthProvider";
import {
  ColorSchemeProvider,
  COLOR_SCHEME_COOKIE_KEY,
  DEFAULT_COLOR_SCHEME,
  isValidColorScheme,
} from "../contexts/ColorSchemeProvider";
import { MantineProvider } from "../contexts/MantineProvider";
import { queryClient } from "../query-client/queryClient";
import { NotificationsProvider } from "@mantine/notifications";
import { EnvironmentsData, getEnvironmentsIndex, getInitialUser } from "../hooks/api/helpers";
import { ENVIRONMENTS_INDEX_COOKIE_KEY, USER_DATA_COOKIE_KEY } from "../components/layout/constants";

export default function App(props: AppProps & { data: ServerData }) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="A collection of useful Dockerfiles and environments to run programs without directly installing dependencies. Not affiliated with Docker, Inc."
        />
        <link rel="icon" type="image/x-icon" href="/logo.svg"></link>
      </Head>

      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider value={props.data.colorScheme}>
          <MantineProvider>
            <NotificationsProvider>
              <AuthProvider user={props.data.user}>
                <Layout initialData={props.data.environments}>
                  <Component {...pageProps} />
                </Layout>
              </AuthProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

/**
 * getInitialProps runs on the server when a user visits the app for the first time.
 * Then it runs on the client every time a <Link> is clicked or the next/router path is modified.
 *
 * ex. with router.push("/new-route")
 *
 * As of now, NextJS does not offer a built-in method to SSR ONLY the initial request.
 * I needed this functionality so the initial page render will show:
 *   - Authenticated/Unauthenticated state
 *   - dark mode / light mode state
 *   - data for the home page
 *
 * These are all pieces of data that I only need on the initial render, and I do not need
 * to continue requesting this data as the user navigates around the app.
 *
 * As a workaround, I use run-time checks inside getInitialProps to determine whether it is being
 * executed on the server or client. When getInitialProps is run on the server, I fetch the
 * necessary data to render the app, and I also use the set-cookie header to store the data client-side.
 * When getInitialProps is run on the client, I use the data stored in the cookie to populate the data,
 * and avoid making additional requests.
 */
App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  // The data I want to SSR on the initial request, to avoid flickers / loading spinner hell.
  let user: User | CookieValueTypes;
  let environments: EnvironmentsData | CookieValueTypes;
  let colorScheme: ColorScheme | CookieValueTypes;

  // ctx.req only exists on server.
  const isServerSide = ctx.req;

  if (isServerSide) {
    const token = getCookie("XSRF-TOKEN", { req: ctx.req });

    // the getCookie function from 'cookies-next' package automatically parses booleans, numbers, etc.
    // So I check if it's a string to see if the XSRF-TOKEN is a potentially valid token.
    const isPotentiallyValidToken = typeof token === "string";

    let userResponse: Response | undefined;

    if (isPotentiallyValidToken) {
      userResponse = await getInitialUser({ token, ctx });
      ctx.res.setHeader("set-cookie", userResponse.headers.get("set-cookie") || ""); // forward the response cookies to the user's browser
    }

    const sessionIsValid = userResponse?.ok;

    if (sessionIsValid) {
      const data = await userResponse!.json();
      user = data as User;
    } else {
      user = null;
    }

    colorScheme = getCookie(COLOR_SCHEME_COOKIE_KEY, ctx);

    if (!isValidColorScheme(colorScheme)) {
      colorScheme = DEFAULT_COLOR_SCHEME;
    }

    environments = await getEnvironmentsIndex();

    // Store all gathered data in the user's browser cookie with a set-cookie header response.
    // This makes the data available when getInitialProps runs on the client-side without making more requests.
    setCookie(COLOR_SCHEME_COOKIE_KEY, colorScheme, { req: ctx.req, res: ctx.res });
    setCookie(ENVIRONMENTS_INDEX_COOKIE_KEY, JSON.stringify(environments), { req: ctx.req, res: ctx.res });
    setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(user), { req: ctx.req, res: ctx.res }); // no sensitive info is contained in user object

    return {
      data: {
        user,
        colorScheme: colorScheme as ColorScheme,
        environments,
      },
    };
  }

  /** The following code only runs on the client-side whenever the user clicks a <Link> */

  environments = getCookie(ENVIRONMENTS_INDEX_COOKIE_KEY);
  if (typeof environments === "string") {
    try {
      environments = JSON.parse(environments);
    } catch (e) {
      // if parsing fails i.e. cookie is malformed, re-request the data.
      environments = await getEnvironmentsIndex();
      setCookie(ENVIRONMENTS_INDEX_COOKIE_KEY, JSON.stringify(environments));
    }
  }

  user = getCookie(USER_DATA_COOKIE_KEY);
  if (typeof user === "string") {
    try {
      user = JSON.parse(user);
    } catch (e) {
      // if parsing fails, invalidate the user state
      user = null;
      deleteCookie(USER_DATA_COOKIE_KEY);
    }
  }

  colorScheme = getCookie(COLOR_SCHEME_COOKIE_KEY);

  if (!isValidColorScheme(colorScheme)) {
    colorScheme = DEFAULT_COLOR_SCHEME;
  }

  return {
    data: {
      user: user ?? null,
      colorScheme: colorScheme as ColorScheme,
      environments: environments as EnvironmentsData,
    },
  };
};
