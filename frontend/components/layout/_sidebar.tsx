import { Aside, Text } from "@mantine/core";
import React from "react";
import { asideSx } from "./styles";

export const Sidebar = () => {
  return (
    <Aside hidden={true} p="md" hiddenBreakpoint="xl" width={{ xl: 300 }} sx={asideSx}>
      <Text>Notifications</Text>
    </Aside>
  );
};
