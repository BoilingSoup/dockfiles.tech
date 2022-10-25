import { MediaQuery, Aside, Text } from "@mantine/core";
import React from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const Sidebar = () => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <Aside
        p="md"
        hiddenBreakpoint="sm"
        width={{ sm: 200, lg: 300 }}
        sx={(theme) => ({
          backgroundColor: colorSchemeHandler(theme.colorScheme, {
            light: theme.colors.blue[3],
            dark: theme.colors.slate[9],
          }),
        })}
      >
        <Text>Application sidebar</Text>
      </Aside>
    </MediaQuery>
  );
};
