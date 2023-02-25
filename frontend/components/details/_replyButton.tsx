import { Box, Text } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons";
import { replyButtonSx } from "./styles";

export const ReplyButton = () => {
  return (
    <Box component="button" sx={replyButtonSx}>
      <IconArrowBackUp />
      <Text ml={6}>reply</Text>
    </Box>
  );
};
