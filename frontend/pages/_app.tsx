import { ColorScheme } from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../components/layout/Layout";
import { ServerData } from "../components/layout/types";
import { APP_URL, SITE_NAME } from "../config/config";
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
                <Layout>
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

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  let user: User = null;
  const token = getCookie("XSRF-TOKEN", { req: ctx.req });

  if (typeof token === "string" && ctx.req) {
    let response = await fetch(`${APP_URL}/user`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: ctx.req.headers.host || "",
        "X-XSRF-TOKEN": token,
        Cookie: ctx.req.headers.cookie || "",
      },
    });
    const data = await response.json();
    ctx.res.setHeader("set-cookie", response.headers.get("set-cookie") || "");
    user = data;
  }

  let colorScheme = getCookie(COLOR_SCHEME_COOKIE_KEY, ctx);

  if (!isValidColorScheme(colorScheme)) {
    colorScheme = DEFAULT_COLOR_SCHEME;
  }

  return {
    data: {
      user,
      colorScheme: colorScheme as ColorScheme,
    },
  };
};
