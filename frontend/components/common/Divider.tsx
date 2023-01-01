import { Divider as MantineDivider, useMantineTheme } from "@mantine/core";
import React from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const Divider = () => {
  const { colors, colorScheme } = useMantineTheme();

  return (
    <MantineDivider
      size="xs"
      color={colorSchemeHandler(colorScheme, {
        light: colors.slate[2],
        dark: colors.slate[8],
      })}
    />
  );
};
