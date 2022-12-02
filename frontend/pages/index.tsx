import type { NextPage } from "next";
import { Center, Text } from "@mantine/core";
import Head from "next/head";
import { HomeSearch } from "../components/home/HomeSearch";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>

      <HomeSearch />
      <Text component="h1">Home</Text>
    </>
  );
};

export default Home;
