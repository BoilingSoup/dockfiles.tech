import type { NextPage } from "next";
import { AppShell, MediaQuery, Aside, Text } from "@mantine/core";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Navbar } from "../components/layout/Navbar";
import Head from "next/head";
import { colorSchemeHandler } from "../theme/color-scheme-handler";

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);

  const navbarToggle = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Home - Dockfiles.io</title>
      </Head>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={<Navbar opened={opened} />}
        header={<Header onHamburgerClick={navbarToggle} />}
        aside={
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Aside
              p="md"
              hiddenBreakpoint="sm"
              width={{ sm: 200, lg: 300 }}
              sx={(theme) => ({
                backgroundColor: colorSchemeHandler(theme.colorScheme, {
                  light: theme.colors.blue[3],
                  dark: theme.colors.slate[9],
                }),
              })}
            >
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: colorSchemeHandler(theme.colorScheme, {
              light: theme.colors.blue[2],
              dark: theme.colors.slate[9],
            }),
          },
        })}
      >
        {/* <Button onClick={() => toggleColorScheme()}>toggle</Button> */}
      </AppShell>
    </>
  );
};

export default Home;
