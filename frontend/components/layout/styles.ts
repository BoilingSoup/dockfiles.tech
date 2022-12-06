import { CSSObject, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const iconSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.blue[2],
  }),
  "&:hover": {
    backgroundColor: colorSchemeHandler(colorScheme, {
      light: colors.blue[1],
    }),
  },
  color: colorSchemeHandler(colorScheme, { light: colors.navy[9] }),
  border: colorSchemeHandler(colorScheme, {
    light: "2px solid rgba(10, 35, 81, 0.7)",
  }),
});

export const appShellSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  main: {
    backgroundColor: colorSchemeHandler(colorScheme, {
      light: colors.blue[2],
      dark: colors.slate[9],
    }),
    paddingBottom: 1,
  },
});

export const signInBtnSx = ({ colors, colorScheme, fn, shadows }: MantineTheme): CSSObject => ({
  width: "85%",
  margin: "1rem",
  boxShadow: shadows.xl,
  backgroundColor: colorSchemeHandler(colorScheme, { light: colors.indigo[9] }),
  "&:hover": {
    backgroundColor: colorSchemeHandler(colorScheme, {
      light: fn.darken(colors.indigo[9], 0.05),
      dark: fn.lighten(colors.blue[8], 0.05),
    }),
  },
});

export const navbarSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.blue[1],
    dark: colors.slate[9],
  }),
});

const bodyStyles: CSSObject = {
  textAlign: "center",
};

const labelStyles: CSSObject = {
  fontWeight: "bold",
  fontSize: "1rem",
};

export const navLinkStyles = {
  body: bodyStyles,
  label: labelStyles,
};

export const navLinkSx = ({ colors, colorScheme, fn, shadows }: MantineTheme): CSSObject => {
  const navy = colors.navy[8];
  const blue = colors.blue[9];
  const slate = colors.slate[8];

  return {
    boxShadow: shadows.sm,
    "&:hover": {
      backgroundColor: colorSchemeHandler(colorScheme, { light: colors.cyan[2], dark: slate }),
      "&[data-active]": {
        backgroundColor: colorSchemeHandler(colorScheme, {
          light: fn.darken(blue, 0.05),
          dark: fn.lighten(navy, 0.05),
        }),
      },
    },
    "&[data-active]": {
      backgroundColor: colorSchemeHandler(colorScheme, { light: blue, dark: navy }),
    },
  };
};

export const asideSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.blue[3],
    dark: colors.slate[9],
  }),
});

export const oAuthBtnSx = ({ colors, colorScheme, fn }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, {
    light: colors.gray[1],
  }),
  "&:hover": {
    backgroundColor: fn.darken(colors.gray[1], 0.05),
  },
  height: "60px",
  border: `1px solid ${colors.gray[5]}`,
});

type modalStylesApi = "title" | "body" | "header" | "root" | "overlay" | "modal" | "close" | "inner";
type modalStylesObj = { [key in modalStylesApi]?: CSSObject };

export const modalStyles: modalStylesObj = {
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
};
