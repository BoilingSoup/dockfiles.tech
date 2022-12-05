import { AppShell } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { Sidebar } from "./_sidebar";
import { Header } from "./_header";
import { Navbar } from "./_navbar";
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
