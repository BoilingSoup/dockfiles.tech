import { AppShell, Aside, MediaQuery, Text } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

type Props = {
  children: ReactElement;
};

export const Layout = (props: Props) => {
  const [opened, setOpened] = useState(false);

  const navbarToggle = () => {
    setOpened((prev) => !prev);
  };
  return (
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
      {props.children}
    </AppShell>
  );
};
