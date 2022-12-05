import { Box, Paper, Text } from "@mantine/core";
import { IconMessage, IconThumbUp } from "@tabler/icons";
import { iconBoxSx, iconGroupBoxSx, paperSx, textSx } from "./styles";

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
