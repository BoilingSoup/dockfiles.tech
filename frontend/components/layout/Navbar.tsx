import { Button, Center, Modal, Navbar as MantineNavbar, Stack, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons";
import React, { useState } from "react";
import { NavLink } from "./NavLink";
import { modalStyles, navbarSx, oAuthBtnSx, signInBtnSx } from "./styles";

const iconSize = 30;
export const navBarHiddenBreakPoint = "sm";

type Props = {
  opened: boolean;
};

export const Navbar = ({ opened: navbarOpened }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const modalCloseHandler = () => setModalOpened(false);
  const modalOpenHandler = () => setModalOpened(true);

  return (
    <>
      <Modal centered opened={modalOpened} onClose={modalCloseHandler} title="Sign In" styles={modalStyles}>
        <Stack>
          <Button variant="white" sx={oAuthBtnSx} leftIcon={<IconBrandGithub size={iconSize} />}>
            <Text size="lg">Sign in with GitHub</Text>
          </Button>
          <Button variant="white" sx={oAuthBtnSx} leftIcon={<IconBrandGitlab size={iconSize} />}>
            <Text size="lg">Sign in with GitLab</Text>
          </Button>
        </Stack>
      </Modal>
      <MantineNavbar
        hiddenBreakpoint={navBarHiddenBreakPoint}
        hidden={!navbarOpened}
        width={{ sm: 200, lg: 300 }}
        sx={navbarSx}
      >
        <NavLink href="/" text="Browse" />
        <NavLink href="/bookmarks" text="Bookmarks" />
        <NavLink href="/settings" text="Settings" />
        <Center>
          <Button onClick={modalOpenHandler} sx={signInBtnSx}>
            Sign In
          </Button>
        </Center>
      </MantineNavbar>
    </>
  );
};
