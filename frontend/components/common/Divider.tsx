import { Divider as MantineDivider, MantineNumberSize, useMantineTheme } from "@mantine/core";
import React from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

type Props = {
  size?: MantineNumberSize;
};

export const Divider = ({ size }: Props) => {
  const { colors, colorScheme } = useMantineTheme();

  return (
    <MantineDivider
      size={size || "xs"}
      color={colorSchemeHandler(colorScheme, {
        light: colors.slate[2],
        dark: colors.slate[8],
      })}
    />
  );
};
