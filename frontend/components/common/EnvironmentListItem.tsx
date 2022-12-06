import { Box, Divider, Paper, Text } from "@mantine/core";
import { IconMessage, IconThumbUp } from "@tabler/icons";
import { iconBoxSx, iconGroupBoxSx, paperSx, textSx } from "./styles";

type Props = {
  id: number;
  name: string;
};

export const EnvironmentListItem = ({ id, name }: Props) => {
  return (
    <>
      <Paper sx={paperSx}>
        <Text component="h3" sx={textSx}>
          {name}
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

      <Divider />
    </>
  );
};
