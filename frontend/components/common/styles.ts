import { CSSObject, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const envListItemHeight = 50;

export const paperSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: colorSchemeHandler(colorScheme, { light: colors.blue[0], dark: colors.slate[8] }),
  "&:hover": {
    background: colorSchemeHandler(colorScheme, { light: colors.cyan[2], dark: colors.slate[6] }),
  },
  height: `${envListItemHeight}px`,
  width: "100%",
  borderRadius: "1px",
});

export const textSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  fontSize: "1.4rem",
  marginLeft: "14px",
  fontWeight: "normal",
  color: colorSchemeHandler(colorScheme, {
    light: colors.navy[8],
    dark: colors.slate[3],
  }),
});

export const iconGroupBoxSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  display: "flex",
  justifyContent: "space-between",
  width: "80px",
  marginRight: "14px",
  color: colorSchemeHandler(colorScheme, {
    light: colors.navy[8],
    dark: colors.slate[3],
  }),
});

export const iconBoxSx = (): CSSObject => ({
  display: "flex",
});

export const mainContainerSx = (): CSSObject => ({
  width: "95%",
  maxWidth: "730px",
  height: "100%",
  position: "relative",
});

export const selectSx = (): CSSObject => ({ width: "150px" });

export const navigationButtonSx = ({ colors, colorScheme, fn }: MantineTheme): CSSObject => ({
  background: "none",
  color: colorSchemeHandler(colorScheme, {
    light: fn.darken(colors.indigo[9], 0.05),
    dark: fn.lighten(colors.slate[5], 0.6),
  }),
  "&:hover": {
    background: "none",
  },
});
