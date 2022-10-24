import { MediaQuery, Navbar as MantineNavbar, Text } from "@mantine/core";
import React from "react";

type Props = {
  opened: boolean;
};

export const Navbar = ({ opened }: Props) => {
  return (
    // <MediaQuery largerThan="sm" styles={{ display: "none" }}>
    <MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Text>Application navbar</Text>
    </MantineNavbar>
    // </MediaQuery>
  );
};
