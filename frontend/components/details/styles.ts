import { CSSObject, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const paperSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  background: colorSchemeHandler(colorScheme, { light: colors.blue[0], dark: colors.slate[8] }),
  // "&:hover": {
  //   background: colorSchemeHandler(colorScheme, { light: colors.cyan[2], dark: colors.slate[6] }),
  // },
  margin: 14,
});

export const boxSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  display: "flex",
  height: 50,
  width: "100%",
});

export const avatarSx = ({ colors, colorScheme, radius }: MantineTheme): CSSObject => ({
  borderRadius: radius.xl,
  border: "1px solid white",
});

export const avatarGroupSx = ({ colors, colorScheme, radius }: MantineTheme): CSSObject => ({
  justifyContent: "center",
  width: 70,
});

export const nameSx = ({ colors, colorScheme, radius }: MantineTheme): CSSObject => ({
  fontSize: "1.2rem",
});

export const contentSx = ({ colors, colorScheme, radius }: MantineTheme): CSSObject => ({
  marginLeft: 70,
  paddingBottom: 10,
});
