import { MediaQuery, Navbar, Text } from "@mantine/core";
import React from "react";

type Props = {
  opened: boolean;
};

export const MobileMenu = ({ opened }: Props) => {
  return (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Text>Application navbar</Text>
      </Navbar>
    </MediaQuery>
  );
};
