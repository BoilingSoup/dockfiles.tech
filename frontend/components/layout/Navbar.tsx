import { Button, Center, Navbar as MantineNavbar, Stack } from "@mantine/core";
import Link from "next/link";
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
        <Center p={"lg"}>
          <Link href="/">Browse All</Link>
        </Center>
        <Center p={"lg"}>
          <Link href="">Categories</Link>
        </Center>
        <Center p={"lg"} mb={3}>
          <Link href="/bookmarks">Bookmarks</Link>
        </Center>
        <Button>Sign In</Button>
        {/* <Button variant="outline">Browse All</Button>
        <Button variant="outline">Categories</Button>
        <Button variant="outline">Bookmarks</Button>
        <Button variant="filled">Sign In</Button> */}
      </Stack>
    </MantineNavbar>
  );
};
