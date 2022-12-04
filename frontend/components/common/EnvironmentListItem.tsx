import { Box, CSSObject, MantineTheme, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconMessage, IconThumbUp, IconWriting } from "@tabler/icons";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

const paperSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: colorSchemeHandler(colorScheme, { light: colors.blue[0], dark: colors.navy[8] }),
  height: "50px",
  width: "100%",
  borderRadius: "1px",
});

const textSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  fontSize: "1.4rem",
  // width: "80%",
  marginLeft: "14px",
});

const iconGroupBoxSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  display: "flex",
  justifyContent: "space-between",
  width: "80px",
  marginRight: "14px",
});

const iconBoxSx = ({ colors, colorScheme }: MantineTheme): CSSObject => ({
  display: "flex",
});

export const EnvironmentListItem = () => {
  return (
    <Paper sx={paperSx}>
      <Text component="h3" sx={textSx}>
        Angular
      </Text>

      <Box sx={iconGroupBoxSx}>
        <Box sx={iconBoxSx}>
          <IconThumbUp />
          <Text>2</Text>
        </Box>
        <Box sx={iconBoxSx}>
          <IconMessage />
          <Text>2</Text>
        </Box>
      </Box>
    </Paper>
  );
};
