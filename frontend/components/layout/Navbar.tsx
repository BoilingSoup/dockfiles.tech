import { Button, Center, Navbar as MantineNavbar } from "@mantine/core";
import React from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { NavLink } from "./NavLink";

type Props = {
  opened: boolean;
};

export const Navbar = ({ opened }: Props) => {
  return (
    <MantineNavbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
      sx={(theme) => ({
        backgroundColor: colorSchemeHandler(theme.colorScheme, {
          light: theme.colors.blue[1],
          dark: theme.colors.slate[9],
        }),
      })}
    >
      <NavLink href="/" text="Browse All" />
      <NavLink text="Categories">
        <NavLink text="test" />
      </NavLink>
      <NavLink href="/bookmarks" text="Bookmarks" />
      <Center>
        <Button href="https://google.com" component="a" sx={{ width: "85%", margin: "1rem" }}>
          Sign In
        </Button>
      </Center>
    </MantineNavbar>
  );
};
