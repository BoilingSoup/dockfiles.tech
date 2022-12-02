import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Head from "next/head";
import { CategoriesSearch } from "../components/common/categories-search/CategoriesSearch";
import { useHomeSearch } from "../zustand-store/home/useHomeSearch";

const Home: NextPage = () => {
  const { input, setInput } = useHomeSearch();

  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>

      <CategoriesSearch value={input} onChange={setInput} />
      <Text component="h1">Home</Text>
    </>
  );
};

export default Home;
