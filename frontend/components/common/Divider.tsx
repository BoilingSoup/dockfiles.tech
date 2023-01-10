import { Divider as MantineDivider, MantineNumberSize, useMantineTheme } from "@mantine/core";
import React from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

type Props = {
  size?: MantineNumberSize;
  m?: MantineNumberSize;
  mt?: MantineNumberSize;
  mb?: MantineNumberSize;
  mr?: MantineNumberSize;
  ml?: MantineNumberSize;
};

export const Divider = ({ size, m, mt, mb, mr, ml }: Props) => {
  const { colors, colorScheme } = useMantineTheme();

  return (
    <MantineDivider
      size={size || "xs"}
      color={colorSchemeHandler(colorScheme, {
        light: colors.slate[2],
        dark: colors.slate[8],
      })}
      m={m}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
    />
  );
};
