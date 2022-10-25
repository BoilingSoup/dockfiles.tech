import {
  Button,
  Center,
  CSSObject,
  MantineTheme,
  Modal,
  ModalProps,
  ModalStylesParams,
  Navbar as MantineNavbar,
  Stack,
} from "@mantine/core";
import React, { useState } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { NavLink } from "./NavLink";

const signInButtonSx = (theme: MantineTheme): CSSObject => ({
  width: "85%",
  margin: "1rem",
  boxShadow: theme.shadows.xl,
});

const navbarSx = (theme: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(theme.colorScheme, {
    light: theme.colors.blue[1],
    dark: theme.colors.slate[9],
  }),
});

type modalStylesApi = "title" | "body" | "header" | "root" | "overlay" | "modal" | "close" | "inner";
type modalStylesObj = { [key in modalStylesApi]?: CSSObject };

const modalStyles: modalStylesObj = {
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
};

type Props = {
  opened: boolean;
};

export const Navbar = ({ opened: navbarOpened }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <Modal centered opened={modalOpened} onClose={() => setModalOpened(false)} title="Sign In" styles={modalStyles}>
        <Stack>
          <Button variant="white">Sign in with GitHub</Button>
          <Button variant="white">Sign in with GitLab</Button>
        </Stack>
      </Modal>
      <MantineNavbar hiddenBreakpoint="xl" hidden={!navbarOpened} width={{ sm: 200, lg: 300 }} sx={navbarSx}>
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
