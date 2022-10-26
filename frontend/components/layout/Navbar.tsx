import { Button, Center, CSSObject, MantineTheme, Modal, Navbar as MantineNavbar, Stack, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import React, { useState } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { NavLink } from "./NavLink";

const signInButtonSx = ({ shadows }: MantineTheme): CSSObject => ({
  width: "85%",
  margin: "1rem",
  boxShadow: shadows.xl,
});

const navbarSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.blue[1],
    dark: colors.slate[9],
  }),
});

const oAuthBtnSx = ({ colors, colorScheme, fn }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.gray[1],
  }),
  "&:hover": {
    backgroundColor: fn.darken(colors.gray[1], 0.05),
  },
  height: "60px",
  border: `1px solid ${colors.gray[5]}`,
});
const iconSize = 30;

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
          <Button variant="white" sx={oAuthBtnSx} leftIcon={<IconBrandGithub size={iconSize} />}>
            <Text size="lg">Sign in with GitHub</Text>
          </Button>
          <Button variant="white" sx={oAuthBtnSx} leftIcon={<IconBrandGitlab size={iconSize} />}>
            <Text size="lg">Sign in with GitLab</Text>
          </Button>
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
