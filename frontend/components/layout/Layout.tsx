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
      <Center style={{ width: "100%" }}>
        <Autocomplete
          placeholder="Search"
          style={{ width: "80%", maxWidth: "570px" }}
          icon={<IconSearch size={16} stroke={1.5} />}
          data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
        />
        <NativeSelect
          // label="Your favorite library/framework"
          placeholder="Select Category"
          data={["React", "Angular", "Svelte", "Vue"]}
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={40}
        />
      </Center>
      {props.children}
    </AppShell>
  );
};
