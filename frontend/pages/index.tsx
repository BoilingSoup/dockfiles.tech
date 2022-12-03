import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Head from "next/head";
import { CategoriesSearch } from "../components/common/categories-search/CategoriesSearch";
import { useHomeCategoriesSearch } from "../zustand-store/home/useHomeCategoriesSearch";

const Home: NextPage = () => {
  const { input, setInput, select, setSelect } = useHomeCategoriesSearch();

  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>

      <CategoriesSearch inputValue={input} onChangeInput={setInput} selectValue={select} onChangeSelect={setSelect} />
      <Text component="h1">Home</Text>
    </>
  );
};

export default Home;
