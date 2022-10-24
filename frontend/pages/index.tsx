import type { NextPage } from "next";
import { AppShell, Button, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { MobileMenu } from "../components/layout/MobileMenu";
import Head from "next/head";
import { colorSchemeHandler } from "../theme/color-scheme-handler";

const Home: NextPage = () => {
  const { toggleColorScheme } = useMantineColorScheme();
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
        navbar={<MobileMenu opened={opened} />}
        header={<Header links={[]} onHamburgerClick={navbarToggle} />}
        styles={(theme) => ({
          main: {
            backgroundColor: colorSchemeHandler(theme.colorScheme, {
              light: theme.colors.blue[0],
              dark: theme.colors.slate[9],
            }),
          },
        })}
      >
        <Button onClick={() => toggleColorScheme()}>toggle</Button>
      </AppShell>
    </>
  );
};

export default Home;
