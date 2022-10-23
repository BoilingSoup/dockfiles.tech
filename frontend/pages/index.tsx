import type { NextPage } from "next";
import {
  AppShell,
  Burger,
  Button,
  useMantineColorScheme,
  useMantineTheme,
  MediaQuery,
  Text,
  Navbar,
} from "@mantine/core";
import { useState } from "react";
import { Header } from "../components/layout/Header";

const Home: NextPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={<Header links={[]} />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Button onClick={() => toggleColorScheme()}>toggle</Button>
    </AppShell>
  );
};

export default Home;
