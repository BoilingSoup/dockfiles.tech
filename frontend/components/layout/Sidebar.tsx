import { MediaQuery, Aside, Text, CSSObject, MantineTheme } from "@mantine/core";
import React from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

const asideSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.blue[3],
    dark: colors.slate[9],
  }),
});

export const Sidebar = () => {
  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }} sx={asideSx}>
        <Text>Application sidebar</Text>
      </Aside>
    </MediaQuery>
  );
};