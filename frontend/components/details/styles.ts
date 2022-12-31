import { CSSObject, MantineTheme } from "@mantine/core";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

const nameAreaHeight = 70;
const avatarContainerWidth = 70;

export const paperSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  background: colorSchemeHandler(colorScheme, {
    light: colors.blue[0],
    dark: colors.slate[8],
  }),
  margin: 14,
});

export const boxSx = (): CSSObject => ({
  display: "flex",
  alignItems: "center",
  height: nameAreaHeight,
  width: "100%",
});

export const avatarSx = ({ colors, colorScheme, radius }: MantineTheme): CSSObject => ({
  borderRadius: radius.xl,
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
  fontSize: "1.2rem",
});

export const contentSx = (): CSSObject => ({
  marginTop: 0,
  marginBottom: 0,
  marginLeft: avatarContainerWidth,
  paddingBottom: 10,
});
