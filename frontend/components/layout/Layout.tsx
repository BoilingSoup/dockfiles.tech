import {
  AppShell,
  Autocomplete,
  Center,
  CSSObject,
  MantineTheme,
  NativeSelect,
} from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { IconChevronDown, IconSearch } from "@tabler/icons";
import { useCategories } from "../../hooks/api/useCategories";

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
  const { data } = useCategories();

  const categories = data?.data.map((obj) => obj.name);

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
      <Center style={{ width: "100%" }}>
        <Autocomplete
          placeholder="Search"
          style={{ width: "80%", maxWidth: "570px" }}
          icon={<IconSearch size={16} stroke={1.5} />}
          data={categories ?? [""]}
        />
        <NativeSelect
          label="Category"
          placeholder="Select Category"
          data={categories ?? [""]}
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={40}
        />
      </Center>
      {props.children}
    </AppShell>
  );
};
