import { Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { CategoriesSearch } from "../../components/common/categories-search/CategoriesSearch";
import { useBookmarksSearch } from "../../zustand-store/bookmarks/useBookmarksSearch";

const Bookmarks: NextPage = () => {
  const { input, setInput } = useBookmarksSearch();

  return (
    <>
      <Head>
        <title>Dockfiles.io | Bookmarks</title>
      </Head>

      <CategoriesSearch value={input} onChange={setInput} />
      <Text component="h1">Bookmarks</Text>
    </>
  );
};

export default Bookmarks;
