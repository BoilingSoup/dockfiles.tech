import type { NextPage } from "next";
import { Container } from "@mantine/core";
import Head from "next/head";
import { CategoriesSearch } from "../components/common/categories-search/CategoriesSearch";
import { useHomeCategoriesSearch } from "../zustand-store/home/useHomeCategoriesSearch";
import { useEnvironments } from "../hooks/api/useEnvironments";
import { useHomePageCursor } from "../zustand-store/home/useHomePageCursor";
import { usePrefetchEnvironments } from "../hooks/api/usePrefetchEnvironments";
import { NavigationButtonsGroup } from "../components/common/NavigationButtonsGroup";
import { EnvironmentListItem } from "../components/common/EnvironmentListItem";
import { mainContainerSx } from "../components/common/styles";

const Home: NextPage = () => {
  const { input, setInput, select: categoryId, setSelect: setCategoryId } = useHomeCategoriesSearch();
  const { cursor, setCursor /**use in onClick handler later*/ } = useHomePageCursor();
  const { data } = useEnvironments({ categoryId, cursor });
  usePrefetchEnvironments({ categoryId, data });

  const environments = data?.data.data;

  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>

      <Container sx={mainContainerSx}>
        <CategoriesSearch
          inputValue={input}
          onChangeInput={setInput}
          selectValue={categoryId}
          onChangeSelect={setCategoryId}
        />
        <Container p={0}>
          {environments?.map((environment) => (
            <EnvironmentListItem key={environment.id} name={environment.name} id={environment.id} />
          ))}
        </Container>
      </Container>
      <NavigationButtonsGroup />
    </>
  );
};

export default Home;
