import { Container, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { CategoriesSearch } from "../../components/common/categories-search/CategoriesSearch";
import { mainContainerSx } from "../../components/common/styles";
import { SITE_NAME } from "../../config/config";
import { useBookmarks } from "../../hooks/api/useBookmarks";
import { useDebouncedCursor } from "../../hooks/api/useDebouncedCursor";
import { usePrefetchBookmarks } from "../../hooks/api/usePrefetchBookmarks";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";
import { useBookmarksPageCursor } from "../../zustand-store/bookmarks/useBookmarksPageCursor";

const Bookmarks: NextPage = () => {
  useRedirectUnauthenticated("/");

  // state management
  const { input, setInput, select: categoryId, setSelect: setCategoryId } = useBookmarksCategoriesSearch();
  const { cursor, setCursor } = useBookmarksPageCursor();
  const [searchParam] = useDebouncedValue(input, 300);
  useDebouncedCursor({ setCursor, searchParam });

  // CSR data fetching
  const { data, isFetching } = useBookmarks({ categoryId, cursor, searchParam });
  usePrefetchBookmarks({ categoryId, data, searchParam });

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Bookmarks</title>
      </Head>

      <Container sx={mainContainerSx}>
        <CategoriesSearch inputValue={input} onChangeInput={setInput} selectValue={select} onChangeSelect={setSelect} />
        <Text component="h1">Bookmarks</Text>
      </Container>
    </>
  );
};

export default Bookmarks;
