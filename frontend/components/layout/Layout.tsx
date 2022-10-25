import { AppShell } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { Sidebar } from "./Sidebar";
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
      aside={<Sidebar />}
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
