import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Head from "next/head";
import { Select } from "../components/common/Select";
import { useCategories } from "../hooks/api/useCategories";

const Home: NextPage = () => {
  const { data } = useCategories();
  const categories = data?.data.map((obj) => obj.name);

  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>
      <Select data={categories} />
      <Text component="h1">Home</Text>
    </>
  );
};

export default Home;
