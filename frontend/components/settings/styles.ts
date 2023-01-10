import { CSSObject, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

export const formWidth = 360;
export const formMaxWidth = 520;

export const titleTextSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  fontSize: "1.8rem",
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
  height: 60,
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

export const accordionStyles = (theme: MantineTheme) => {
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
