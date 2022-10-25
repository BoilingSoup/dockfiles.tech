import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>
      <Text component="h1">Home</Text>
    </>
  );
};

export default Home;
