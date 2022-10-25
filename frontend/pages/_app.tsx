import { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import { ColorSchemeProvider } from "../contexts/ColorSchemeProvider";
import { MantineProvider } from "../contexts/MantineProvider";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Dockfiles.io</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/logo.svg"></link>
      </Head>

      <ColorSchemeProvider>
        <MantineProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
