import { Button, Center, Navbar as MantineNavbar } from "@mantine/core";
import React, { useState } from "react";
import { navbarSx, signInBtnSx } from "./styles";
import { UserNavLinksGroup } from "./_userNavLinksGroup";
import { Modal } from "./_modal";
import { BrowseNavLink } from "./_browseNavLink";

export const navBarHiddenBreakPoint = "sm";

type Props = {
  opened: boolean;
  onLinkClick: () => void;
};

export const Navbar = ({ opened: navbarOpened, onLinkClick: navbarCloseHandler }: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const modalCloseHandler = () => setModalOpened(false);
  const modalOpenHandler = () => setModalOpened(true);

  return (
    <>
      <Modal opened={modalOpened} onClose={modalCloseHandler} />

      <MantineNavbar
        hiddenBreakpoint={navBarHiddenBreakPoint}
        hidden={!navbarOpened}
        width={{ sm: 200, lg: 300 }}
        sx={navbarSx}
      >
        <BrowseNavLink onLinkClick={navbarCloseHandler} />
        <UserNavLinksGroup onLinkClick={navbarCloseHandler} />
        <Center>
          <Button onClick={modalOpenHandler} sx={signInBtnSx}>
            Sign In
          </Button>
        </Center>
      </MantineNavbar>
    </>
  );
};
