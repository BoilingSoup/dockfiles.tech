import { Button, Center, Navbar as MantineNavbar } from "@mantine/core";
import React, { useState } from "react";
import { NavLink } from "./_navLink";
import { navbarSx, signInBtnSx } from "./styles";
import { UserNavLinksGroup } from "./_userNavLinksGroup";
import { Modal } from "./_modal";

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
      <Modal opened={modalOpened} onClose={modalCloseHandler} />

      <MantineNavbar
        hiddenBreakpoint={navBarHiddenBreakPoint}
        hidden={!navbarOpened}
        width={{ sm: 200, lg: 300 }}
        sx={navbarSx}
      >
        <NavLink href="/" text="Browse" />
        <UserNavLinksGroup />
        <Center>
          <Button onClick={modalOpenHandler} sx={signInBtnSx}>
            Sign In
          </Button>
        </Center>
      </MantineNavbar>
    </>
  );
};
