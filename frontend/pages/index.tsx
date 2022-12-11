import type { NextPage } from "next";
import { Center, Container, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import Head from "next/head";
import { CategoriesSearch } from "../components/common/categories-search/CategoriesSearch";
import { useHomeCategoriesSearch } from "../zustand-store/home/useHomeCategoriesSearch";
import { useEnvironments } from "../hooks/api/useEnvironments";
import { useHomePageCursor } from "../zustand-store/home/useHomePageCursor";
import { usePrefetchEnvironments } from "../hooks/api/usePrefetchEnvironments";
import { NavigationButtonsGroup } from "../components/common/NavigationButtonsGroup";
import { EnvironmentListItem, EnvironmentListItemSkeleton } from "../components/common/EnvironmentListItem";
import { mainContainerSx } from "../components/common/styles";
import { CursorsObj } from "../components/common/types";
import { INITIAL_PAGE_CURSOR } from "../zustand-store/types";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { PAGE_SIZE } from "../config/config";
import { ChangeEvent } from "react";

const Home: NextPage = () => {
  // state management
  const { input, setInput, select: categoryId, setSelect: setCategoryId } = useHomeCategoriesSearch();
  const [searchParam] = useDebouncedValue(input, 300);
  const { cursor, setCursor } = useHomePageCursor();

  // data fetching
  const { data, isSkeleton, isFetching } = useEnvironments({ categoryId, cursor, searchParam });
  usePrefetchEnvironments({ categoryId, data, searchParam });

  const environments = data?.data.data;
  const noResults = !isSkeleton && !environments?.length;
  const pageCursors: CursorsObj = {
    next: data?.data.next_cursor,
    prev: data?.data.prev_cursor,
  };

  const inputChangeHandler = (input: string) => {
    setCursor(INITIAL_PAGE_CURSOR);
    setInput(input);
  };

  const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setCursor(INITIAL_PAGE_CURSOR);
    setCategoryId(event);
  };

  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
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

          {isSkeleton && new Array(PAGE_SIZE).fill(null).map((_, index) => <EnvironmentListItemSkeleton key={index} />)}

          {environments?.map((environment) => (
            <EnvironmentListItem key={environment.id} name={environment.name} string_id={environment.string_id} />
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

export default Home;
