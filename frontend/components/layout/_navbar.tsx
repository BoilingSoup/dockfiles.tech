import { Button, Center, Navbar as MantineNavbar } from "@mantine/core";
import React, { useState } from "react";
import { navbarSx, signInOrRegisterBtnSx } from "./styles";
import { UserNavLinksGroup } from "./_userNavLinksGroup";
import { BrowseNavLink } from "./_browseNavLink";
import { LoginModal } from "./_loginModal";
import { RegisterModal } from "./_registerModal";
import { useAuth } from "../../contexts/AuthProvider";
import { useMediaQuery } from "@mantine/hooks";

export const navBarHiddenBreakPoint = "sm";

type Props = {
  opened: boolean;
  onLinkClick: () => void;
};

export const Navbar = ({ opened: navbarOpened, onLinkClick: navbarCloseHandler }: Props) => {
  const { user } = useAuth();
  const largeScreen = useMediaQuery("(min-width: 900px)");
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);

  const loginModalCloseHandler = () => setLoginModalOpened(false);
  const loginModalOpenHandler = () => setLoginModalOpened(true);

  const registerModalCloseHandler = () => setRegisterModalOpened(false);
  const registerModalOpenHandler = () => setRegisterModalOpened(true);

  return (
    <>
      <LoginModal opened={loginModalOpened} onClose={loginModalCloseHandler} />
      <RegisterModal opened={registerModalOpened} onClose={registerModalCloseHandler} />

      <MantineNavbar
        hiddenBreakpoint={navBarHiddenBreakPoint}
        hidden={!navbarOpened}
        width={{ sm: 200, lg: 300 }}
        sx={navbarSx}
      >
        <BrowseNavLink onLinkClick={navbarCloseHandler} />
        {user && <UserNavLinksGroup onLinkClick={navbarCloseHandler} />}
        <Center style={{ flexDirection: "column" }}>
          <Button onClick={loginModalOpenHandler} sx={signInOrRegisterBtnSx}>
            Sign In
          </Button>
          <Button onClick={registerModalOpenHandler} sx={signInOrRegisterBtnSx}>
            Register
          </Button>
        </Center>
      </MantineNavbar>
    </>
  );
};
