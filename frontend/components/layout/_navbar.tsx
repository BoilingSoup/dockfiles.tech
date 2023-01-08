import { Button, Center, Loader, Navbar as MantineNavbar } from "@mantine/core";
import React, { useState } from "react";
import { authControlBtnSx, navbarSx } from "./styles";
import { UserNavLinksGroup } from "./_userNavLinksGroup";
import { BrowseNavLink } from "./_browseNavLink";
import { LoginModal } from "./_loginModal";
import { RegisterModal } from "./_registerModal";
import { useAuth } from "../../contexts/AuthProvider";
import { useLogoutMutation } from "../../hooks/api/useLogoutMutation";

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

const LogoutButton = () => {
  const { mutate: logoutMutation, isLoading: logoutIsLoading } = useLogoutMutation();
  return (
    <Button onClick={() => logoutMutation()} sx={authControlBtnSx}>
      {logoutIsLoading ? <Loader color="gray" size="sm" /> : "Sign out"}
    </Button>
  );
};

type Props = {
  opened: boolean;
  onLinkClick: () => void;
};

export const navBarHiddenBreakPoint = "sm";

export const Navbar = ({ opened: navbarOpened, onLinkClick: navbarCloseHandler }: Props) => {
  const { user } = useAuth();

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
            <LogoutButton />
          ) : (
            <UnauthenticatedButtons onLoginClick={loginModalOpenHandler} onRegisterClick={registerModalOpenHandler} />
          )}
        </Center>
      </MantineNavbar>
    </>
  );
};
