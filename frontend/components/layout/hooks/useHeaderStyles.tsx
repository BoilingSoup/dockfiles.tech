import { createStyles } from "@mantine/core";
import { colorSchemeHandler } from "../../../theme/color-scheme-handler";

export const useHeaderStyles = () => {
  return createStyles((theme) => ({
    header: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      backgroundColor: colorSchemeHandler(theme.colorScheme, {
        light: theme.colors.blue[2],
        dark: theme.colors.slate[9],
      }),
      boxShadow: theme.shadows.sm,
    },

    inner: {
      height: 56,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }))();
};
