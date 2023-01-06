import { ColorScheme } from "@mantine/core";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../components/layout/Layout";
import { ServerData } from "../components/layout/types";
import { SITE_NAME } from "../config/config";
import { AuthProvider } from "../contexts/AuthProvider";
import {
  ColorSchemeProvider,
  COLOR_SCHEME_COOKIE_KEY,
  DEFAULT_COLOR_SCHEME,
  isValidColorScheme,
} from "../contexts/ColorSchemeProvider";
import { MantineProvider } from "../contexts/MantineProvider";
import { getUserInitialData } from "../hooks/api/helpers";
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
              <AuthProvider>
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
  const [user] = await getUserInitialData();

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
