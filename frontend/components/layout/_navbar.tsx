import { Button, Center, Loader, Navbar as MantineNavbar } from "@mantine/core";
import React, { useState } from "react";
import { authControlBtnSx, navbarSx } from "./styles";
import { UserNavLinksGroup } from "./_userNavLinksGroup";
import { BrowseNavLink } from "./_browseNavLink";
import { LoginModal } from "./_loginModal";
import { RegisterModal } from "./_registerModal";
import { useAuth } from "../../contexts/AuthProvider";
import { useLogoutMutation } from "../../hooks/api/useLogoutMutation";

export const navBarHiddenBreakPoint = "sm";

type UnauthenticatedBtnProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

const UnauthenticatedButtons = ({
  onLoginClick: loginModalOpenHandler,
  onRegisterClick: registerModalOpenHandler,
}: UnauthenticatedBtnProps) => {
  return (
    <>
      <Button onClick={loginModalOpenHandler} sx={authControlBtnSx}>
        Sign In
      </Button>
      <Button onClick={registerModalOpenHandler} sx={authControlBtnSx}>
        Register
      </Button>
    </>
  );
};

type Props = {
  opened: boolean;
  onLinkClick: () => void;
};

export const Navbar = ({ opened: navbarOpened, onLinkClick: navbarCloseHandler }: Props) => {
  const { user } = useAuth();
  const { mutate: logoutMutation, isLoading: logoutIsLoading } = useLogoutMutation();

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
          {user ? (
            <Button onClick={() => logoutMutation()} sx={authControlBtnSx}>
              {logoutIsLoading ? <Loader color="gray" size="sm" /> : "Sign out"}
            </Button>
          ) : (
            <UnauthenticatedButtons onLoginClick={loginModalOpenHandler} onRegisterClick={registerModalOpenHandler} />
          )}
        </Center>
      </MantineNavbar>
    </>
  );
};
