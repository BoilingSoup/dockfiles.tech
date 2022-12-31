import { CSSObject, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const paperSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  background: colorSchemeHandler(colorScheme, { light: colors.blue[0], dark: colors.slate[8] }),
  // "&:hover": {
  //   background: colorSchemeHandler(colorScheme, { light: colors.cyan[2], dark: colors.slate[6] }),
  // },
});
