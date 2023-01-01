import { Aside, Text } from "@mantine/core";
import React from "react";
import { asideSx } from "./styles";

export const asideWidth = 300;

export const Sidebar = () => {
  return (
    <Aside hidden={true} p="md" hiddenBreakpoint="xl" width={{ xl: asideWidth }} sx={asideSx}>
      <Text>Notifications</Text>
    </Aside>
  );
};
