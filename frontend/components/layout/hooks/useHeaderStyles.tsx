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
    },

    inner: {
      height: 56,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    links: {
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },

    search: {
      [theme.fn.smallerThan("xs")]: {
        display: "none",
      },
    },

    link: {
      display: "block",
      lineHeight: 1,
      padding: "8px 12px",
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  }))();
};
