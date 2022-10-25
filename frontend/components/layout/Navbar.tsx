import { Button, Navbar as MantineNavbar, Stack, Text } from "@mantine/core";
import React from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

type Props = {
  opened: boolean;
};

export const Navbar = ({ opened }: Props) => {
  return (
    <MantineNavbar
      p="md"
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
      <Stack
        sx={(theme) => ({
          height: 300,
        })}
      >
        <Button variant="outline">Browse All</Button>
        <Button variant="outline">Categories</Button>
        <Button variant="outline">Bookmarks</Button>
        <Button variant="filled">Sign In</Button>
      </Stack>
    </MantineNavbar>
  );
};
