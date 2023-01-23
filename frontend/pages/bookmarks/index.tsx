import { Center, Container, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { NextPage } from "next";
import Head from "next/head";
import React, { ChangeEvent } from "react";
import { CategoriesSearch } from "../../components/common/categories-search/CategoriesSearch";
import { EnvironmentListItem } from "../../components/common/EnvironmentListItem";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { NavigationButtonsGroup } from "../../components/common/NavigationButtonsGroup";
import { mainContainerSx } from "../../components/common/styles";
import { CursorsObj } from "../../components/common/types";
import { SITE_NAME } from "../../config/config";
import { useBookmarks } from "../../hooks/api/useBookmarks";
import { usePrefetchBookmarks } from "../../hooks/api/usePrefetchBookmarks";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";
import { useBookmarksPageCursor } from "../../zustand-store/bookmarks/useBookmarksPageCursor";
import { INITIAL_PAGE_CURSOR } from "../../zustand-store/types";

const Bookmarks: NextPage = () => {
  useRedirectUnauthenticated("/");

  // state management
  const { input, setInput, select: categoryId, setSelect: setCategoryId } = useBookmarksCategoriesSearch();
  const { cursor, setCursor } = useBookmarksPageCursor();
  const [searchParam] = useDebouncedValue(input, 300);

  // CSR data fetching
  const { data, isFetching } = useBookmarks({ categoryId, cursor, searchParam });
  usePrefetchBookmarks({ categoryId, data, searchParam });

  const environments = data?.data.data;
  const noResults = !isFetching && !environments?.length;
  const pageCursors: CursorsObj = {
    next: data?.data.next_cursor,
    prev: data?.data.prev_cursor,
  };

  const inputChangeHandler = (input: string) => {
    setInput(input);
    setCursor(INITIAL_PAGE_CURSOR);
  };

  const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setCursor(INITIAL_PAGE_CURSOR);
    setCategoryId(event);
  };

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Bookmarks</title>
      </Head>

      <Container sx={mainContainerSx}>
        <CategoriesSearch
          inputValue={input}
          onChangeInput={inputChangeHandler}
          selectValue={categoryId}
          onChangeSelect={selectChangeHandler}
        />
        <Container style={{ position: "relative" }} mt={10} p={0}>
          {isFetching && <LoadingSpinner />}

          {environments?.map((environment) => (
            <EnvironmentListItem
              key={environment.id}
              name={environment.name}
              string_id={environment.string_id}
              comments_count={environment.comments_count}
              likes_count={environment.likes_count}
            />
          ))}

          {noResults && (
            <Center mt={360}>
              <Text style={{ fontSize: "2.2rem" }}>No search results found!</Text>
            </Center>
          )}
          <NavigationButtonsGroup pageCursors={pageCursors} onClick={setCursor} />
        </Container>
      </Container>
    </>
  );
};

export default Bookmarks;
