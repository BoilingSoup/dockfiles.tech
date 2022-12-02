import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { Layout } from "../components/layout/Layout";
import { ColorSchemeProvider } from "../contexts/ColorSchemeProvider";
import { MantineProvider } from "../contexts/MantineProvider";
import { queryClient } from "../query-client/queryClient";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Dockfiles.io</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="A collection of useful Dockerfiles and environments to run programs without directly installing dependencies. Not affiliated with Docker, Inc."
        />
        <link rel="icon" type="image/x-icon" href="/logo.svg"></link>
      </Head>

      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider>
          <MantineProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
