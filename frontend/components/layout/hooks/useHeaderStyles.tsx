import { createStyles, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../../theme/color-scheme-handler";

export const useHeaderStyles = () => {
  return createStyles(({ colors, colorScheme, shadows, spacing }: MantineTheme) => ({
    header: {
      paddingLeft: spacing.md,
      paddingRight: spacing.md,
      backgroundColor: colorSchemeHandler(colorScheme, {
        light: colors.blue[2],
        dark: colors.slate[9],
      }),
      boxShadow: shadows.sm,
    },

    inner: {
      height: 56,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }))();
};
