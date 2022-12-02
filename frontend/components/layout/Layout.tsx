import { AppShell, Autocomplete, Center, CSSObject, MantineTheme, NativeSelect } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { IconChevronDown, IconSearch } from "@tabler/icons";

const appShellSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  main: {
    backgroundColor: colorSchemeHandler(colorScheme, {
      light: colors.blue[2],
      dark: colors.slate[9],
    }),
  },
});

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
      sx={appShellSx}
    >
      {props.children}
    </AppShell>
  );
};
