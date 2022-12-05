import { AppShell } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { appShellSx } from "./styles";

type Props = {
  children: ReactElement;
};

export const Layout = (props: Props) => {
  const [opened, setOpened] = useState(false);

  const navbarToggle = () => {
    setOpened((prev) => !prev);
  };

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      header={<Header onHamburgerClick={navbarToggle} />}
      aside={<Sidebar />}
      sx={appShellSx}
    >
      {props.children}
    </AppShell>
  );
};
