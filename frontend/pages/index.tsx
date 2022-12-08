import type { NextPage } from "next";
import { Container } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import Head from "next/head";
import { CategoriesSearch } from "../components/common/categories-search/CategoriesSearch";
import { useHomeCategoriesSearch } from "../zustand-store/home/useHomeCategoriesSearch";
import { useEnvironments } from "../hooks/api/useEnvironments";
import { useHomePageCursor } from "../zustand-store/home/useHomePageCursor";
import { usePrefetchEnvironments } from "../hooks/api/usePrefetchEnvironments";
import { NavigationButtonsGroup } from "../components/common/NavigationButtonsGroup";
import { EnvironmentListItem } from "../components/common/EnvironmentListItem";
import { mainContainerSx } from "../components/common/styles";
import { LoadingState } from "../components/home/LoadingState";
import { CursorsObj } from "../components/common/types";
import { INITIAL_PAGE_CURSOR } from "../zustand-store/types";

const Home: NextPage = () => {
  const { input, setInput, select: categoryId, setSelect: setCategoryId } = useHomeCategoriesSearch();
  const [searchParam] = useDebouncedValue(input, 300);
  const { cursor, setCursor } = useHomePageCursor();

  const { data, isLoading } = useEnvironments({ categoryId, cursor, searchParam });
  usePrefetchEnvironments({ categoryId, data, searchParam });

  const environments = data?.data.data;
  const pageCursors: CursorsObj = {
    next: data?.data.next_cursor,
    prev: data?.data.prev_cursor,
  };

  const inputChangeHandler = (input: string) => {
    setCursor(INITIAL_PAGE_CURSOR);
    setInput(input);
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
          onChangeSelect={setCategoryId}
        />

        {isLoading && <LoadingState />}

        <Container mt={10} p={0}>
          {environments?.map((environment) => (
            <EnvironmentListItem key={environment.id} name={environment.name} string_id={environment.string_id} />
          ))}
          <NavigationButtonsGroup pageCursors={pageCursors} onClick={setCursor} />
        </Container>
      </Container>
    </>
  );
};

export default Home;
