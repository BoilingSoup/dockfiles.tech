import { Box, CSSObject, MantineTheme, Paper, Text } from "@mantine/core";
import { IconMessage, IconThumbUp } from "@tabler/icons";
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

const textSx = (): CSSObject => ({
  fontSize: "1.4rem",
  marginLeft: "14px",
});

const iconGroupBoxSx = (): CSSObject => ({
  display: "flex",
  justifyContent: "space-between",
  width: "80px",
  marginRight: "14px",
});

const iconBoxSx = (): CSSObject => ({
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
