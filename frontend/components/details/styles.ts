import { CSSObject, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

const nameAreaHeight = 70;
const avatarContainerWidth = 70;
export const commentsMargin = 14;
export const repliesBoxMarginLeft = commentsMargin * 7;

export const paperSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  background: colorSchemeHandler(colorScheme, {
    light: colors.blue[0],
    dark: colors.slate[8],
  }),
  margin: commentsMargin,
  padding: 14,
  paddingBottom: 8,
});

export const replySx = ({ colors, colorScheme, fn }: MantineTheme): CSSObject => ({
  background: colorSchemeHandler(colorScheme, {
    light: fn.lighten(colors.blue[1], 0.3),
    dark: fn.darken(colors.slate[8], 0.15),
  }),
  margin: commentsMargin,
  marginLeft: 0,
  padding: 14,
  paddingBottom: 8,
});

export const boxSx = (): CSSObject => ({
  display: "flex",
  alignItems: "center",
  height: nameAreaHeight,
  width: "100%",
});

export const avatarStyles = ({ colors, colorScheme }: MantineTheme) => ({
  borderRadius: "999px",
  border: colorSchemeHandler(colorScheme, {
    light: `1px solid ${colors.blue[8]}`,
    dark: `1px solid ${colors.blue[6]}`,
  }),
});

export const avatarGroupSx = (): CSSObject => ({
  justifyContent: "center",
  width: avatarContainerWidth,
});

export const nameSx = (): CSSObject => ({
  fontSize: "1.4rem",
});

export const contentSx = (): CSSObject => ({
  marginTop: 0,
  marginBottom: 0,
  marginLeft: avatarContainerWidth,
  paddingBottom: 10,
  fontSize: "1.1rem",
  overflowWrap: "break-word",
});

export const repliesBoxSx = (): CSSObject => ({
  display: "flex",
  margin: 10,
  marginLeft: avatarContainerWidth,
});

export const expandRepliesSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  border: 0,
  padding: 0,
  display: "flex",
  fontWeight: 500,
  fontSize: "1.1rem",
  cursor: "pointer",
  color: colorSchemeHandler(colorScheme, {
    light: colors.indigo[9],
    dark: colors.blue[4],
  }),
  background: "none",
  "&:hover": {
    background: "none",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
});

export const replyButtonSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  border: 0,
  padding: 0,
  display: "flex",
  fontWeight: 500,
  fontSize: "1.1rem",
  cursor: "pointer",
  color: colorSchemeHandler(colorScheme, {
    light: colors.indigo[9],
    dark: colors.blue[4],
  }),
  background: "none",
  "&:hover": {
    background: "none",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
});

export const tabsSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  position: "fixed",
  zIndex: 2,
  width: "100%",
  top: 56,
  paddingTop: 20,
  background: colorSchemeHandler(colorScheme, {
    light: colors.blue[2],
    dark: colors.slate[9],
  }),
});
