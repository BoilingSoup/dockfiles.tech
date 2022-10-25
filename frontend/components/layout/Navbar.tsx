import { Button, Center, CSSObject, MantineTheme, Modal, Navbar as MantineNavbar, Stack } from "@mantine/core";
import React, { useState } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { NavLink } from "./NavLink";

const signInButtonSx = (theme: MantineTheme): CSSObject => ({
  width: "85%",
  margin: "1rem",
  boxShadow: theme.shadows.xl,
});

type Props = {
  opened: boolean;
};

export const Navbar = ({ opened: navbarOpened }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <Modal centered opened={modalOpened} onClose={() => setModalOpened(false)} title="Introduce yourself!">
        <Stack>
          <Button variant="white">Sign in with GitHub</Button>
          <Button variant="white">Sign in with GitLab</Button>
        </Stack>
      </Modal>
      <MantineNavbar
        hiddenBreakpoint="xl"
        hidden={!navbarOpened}
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
          <Button onClick={() => setModalOpened(true)} sx={signInButtonSx}>
            Sign In
          </Button>
        </Center>
      </MantineNavbar>
    </>
  );
};
