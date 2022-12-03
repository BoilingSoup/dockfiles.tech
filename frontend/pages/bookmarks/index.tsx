import { Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { CategoriesSearch } from "../../components/common/categories-search/CategoriesSearch";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";

const Bookmarks: NextPage = () => {
  const { input, setInput, select, setSelect } = useBookmarksCategoriesSearch();

  return (
    <>
      <Head>
        <title>Dockfiles.io | Bookmarks</title>
      </Head>

      <CategoriesSearch inputValue={input} onChangeInput={setInput} selectValue={select} onChangeSelect={setSelect} />
      <Text component="h1">Bookmarks</Text>
    </>
  );
};

export default Bookmarks;
