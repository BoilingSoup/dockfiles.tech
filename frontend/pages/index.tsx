import type { NextPage } from "next";
import { Center, Text } from "@mantine/core";
import Head from "next/head";
import { Select } from "../components/common/Select";
import { useCategories } from "../hooks/api/useCategories";
import { Search } from "../components/common/Search";

const Home: NextPage = () => {
  const { data } = useCategories();
  const categories = data?.data.map((obj) => obj.name);

  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>
      <Center style={{ width: "100%" }}>
        <Search />
        <Select data={categories} />
      </Center>

      <Text component="h1">Home</Text>
    </>
  );
};

export default Home;
