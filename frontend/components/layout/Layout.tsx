import { AppShell } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { Sidebar } from "./_sidebar";
import { Header } from "./_header";
import { Navbar } from "./_navbar";
import { appShellSx } from "./styles";
import { useDisclosure, useTimeout } from "@mantine/hooks";
import { EnvironmentsData } from "../../hooks/api/helpers";
import { useSetEnvironmentsIndexInitialData } from "../../hooks/api/useSetEnvironmentsIndexInitialData";

type Props = {
  children: ReactElement;
  initialData: EnvironmentsData;
};

export const Layout = (props: Props) => {
  const [navbarOpened, setNavbarOpened] = useState(false);
  const [hamburgerOpened, { toggle: hamburgerAnimation }] = useDisclosure(false);
  const { start: navbarCloseHandler } = useTimeout(() => navbarToggleHandler(), 50);

  useSetEnvironmentsIndexInitialData(props.initialData);

  const navbarToggleHandler = () => {
    setNavbarOpened((prev) => !prev);
    hamburgerAnimation();
  };

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar opened={navbarOpened} onLinkClick={navbarCloseHandler} />}
      header={<Header hamburgerOpened={hamburgerOpened} onHamburgerClick={navbarToggleHandler} />}
      aside={<Sidebar />}
      sx={appShellSx}
    >
      {props.children}
    </AppShell>
  );
};
