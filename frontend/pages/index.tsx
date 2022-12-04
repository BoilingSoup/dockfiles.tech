import type { NextPage } from "next";
import { Text } from "@mantine/core";
import Head from "next/head";
import { CategoriesSearch } from "../components/common/categories-search/CategoriesSearch";
import { useHomeCategoriesSearch } from "../zustand-store/home/useHomeCategoriesSearch";
import { useEnvironments } from "../hooks/api/useEnvironments";
import { useHomePageCursor } from "../zustand-store/home/useHomePageCursor";
import { usePrefetchEnvironments } from "../hooks/api/usePrefetchEnvironments";
import { NavigationButtonsGroup } from "../components/common/NavigationButtonsGroup";

const Home: NextPage = () => {
  const { input, setInput, select: categoryId, setSelect: setCategoryId } = useHomeCategoriesSearch();
  const { cursor, setCursor /**use in onClick handler later*/ } = useHomePageCursor();
  const { data } = useEnvironments({ categoryId, cursor });
  usePrefetchEnvironments({ categoryId, data });

  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>

      <CategoriesSearch
        inputValue={input}
        onChangeInput={setInput}
        selectValue={categoryId}
        onChangeSelect={setCategoryId}
      />
      {/* <Text component="h1">Home</Text> */}
      <NavigationButtonsGroup />
    </>
  );
};

export default Home;
