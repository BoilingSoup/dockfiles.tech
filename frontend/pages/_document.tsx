import { createStylesServer, ServerStyles } from "@mantine/next";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { myCache } from "../contexts/MantineProvider";

const stylesServer = createStylesServer(myCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [initialProps.styles, <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
