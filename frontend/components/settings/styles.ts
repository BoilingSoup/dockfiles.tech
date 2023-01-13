import { CSSObject, MantineTheme } from "@mantine/core";
import { CSSProperties } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const formWidth = 360;
export const formMaxWidth = 520;

export const titleTextSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  fontSize: "1.3rem",
});

export const avatarSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  borderRadius: "9999px",
  overflow: "hidden",
  position: "relative",
  border: colorSchemeHandler(colorScheme, {
    light: `1px solid ${colors.blue[8]}`,
    dark: `1px solid ${colors.blue[6]}`,
  }),
});

export const cameraContainerSx = ({ colorScheme }: MantineTheme): CSSObject => ({
  position: "absolute",
  bottom: 0,
  background: colorSchemeHandler(colorScheme, {
    dark: "rgba(0, 0, 0, 0.6)",
    light: "rgba(0, 0, 0, 0.4)",
  }),
  width: "100%",
  height: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const overlayBoxSx = ({ colorScheme }: MantineTheme): CSSObject => ({
  position: "absolute",
  bottom: 0,
  width: 400,
  height: 400,
  background: colorSchemeHandler(colorScheme, {
    dark: "rgba(0, 0, 0, 0.4)",
    light: "rgba(0, 0, 0, 0.2)",
  }),
  cursor: "pointer",
});

export const deleteAccordionTextColor = ({ colorScheme, fn }: MantineTheme) => {
  return colorSchemeHandler(colorScheme, {
    dark: "rgba(240, 13, 69, 0.8)",
    light: fn.darken("rgba(240, 13, 69, 0.8)", 0.2),
  });
};

export const deleteButtonSx = (theme: MantineTheme): CSSObject => ({
  background: deleteAccordionTextColor(theme),
  "&:hover": {
    backgroundColor: colorSchemeHandler(theme.colorScheme, {
      light: theme.fn.darken(deleteAccordionTextColor(theme)!, 0.05),
      dark: theme.fn.lighten(deleteAccordionTextColor(theme)!, 0.1),
    }),
  },
});

export const changePasswordButtonSx = ({ shadows, colors, colorScheme, fn }: MantineTheme): CSSObject => ({
  boxShadow: shadows.xl,
  backgroundColor: colorSchemeHandler(colorScheme, { light: colors.indigo[9] }),
  "&:hover": {
    backgroundColor: colorSchemeHandler(colorScheme, {
      light: fn.darken(colors.indigo[9], 0.05),
      dark: fn.lighten(colors.blue[8], 0.05),
    }),
  },
});

export const deleteAccountAccordionStyles = (theme: MantineTheme) => {
  const { colors, colorScheme } = theme;
  return {
    chevron: {
      "&[data-rotate]": {
        transform: "rotate(180deg)",
      },
    },
    label: {
      fontWeight: 800,
    },
    control: {
      maxWidth: formMaxWidth,
      width: formWidth,
      color: deleteAccordionTextColor(theme),
      backgroundColor: colorSchemeHandler(colorScheme, {
        dark: colors.slate[8],
        light: colors.blue[1],
      }),
    },
    content: {
      fontWeight: 800,
      color: deleteAccordionTextColor(theme),
      backgroundColor: colorSchemeHandler(colorScheme, {
        dark: colors.slate[8],
        light: colors.blue[1],
      }),
    },
  };
};

export const changePasswordAccordionStyles = (theme: MantineTheme) => {
  const { colors, colorScheme } = theme;
  return {
    chevron: {
      "&[data-rotate]": {
        transform: "rotate(180deg)",
      },
    },
    label: {
      fontWeight: 800,
    },
    control: {
      maxWidth: formMaxWidth,
      width: formWidth,
      // color: deleteAccordionTextColor(theme),
      backgroundColor: colorSchemeHandler(colorScheme, {
        dark: colors.slate[8],
        light: colors.blue[1],
      }),
    },
    content: {
      fontWeight: 800,
      // color: deleteAccordionTextColor(theme),
      backgroundColor: colorSchemeHandler(colorScheme, {
        dark: colors.slate[8],
        light: colors.blue[1],
      }),
    },
  };
};

export const buttonsSx = ({ colors, colorScheme, fn }: MantineTheme): CSSObject => ({
  backgroundColor: colorSchemeHandler(colorScheme, { light: colors.indigo[9] }),
  "&:hover": {
    backgroundColor: colorSchemeHandler(colorScheme, {
      light: fn.darken(colors.indigo[9], 0.05),
      dark: fn.lighten(colors.blue[8], 0.05),
    }),
  },
});

export const formStyles = { maxWidth: formMaxWidth, width: formWidth, margin: "auto" };

export const formCenterStyles: CSSProperties = { justifyContent: "space-around", flexDirection: "column" };

export const verifiedBadgeGradient = { from: "teal", to: "lime", deg: 105 };

export const unverifiedBadgeStyles = { root: { background: "#fcba03", color: "navy" } };

export const accordionContainerStyles = {
  alignItems: "center",
  maxWidth: formMaxWidth,
  width: formWidth,
  margin: "auto",
};
