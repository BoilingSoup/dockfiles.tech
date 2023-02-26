import { Box, Text } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons";
import { replyButtonSx } from "./styles";

type Props = {
  onClick: () => void;
};

export const ReplyButton = ({ onClick: clickHandler }: Props) => {
  return (
    <Box onClick={clickHandler} component="button" sx={replyButtonSx}>
      <IconArrowBackUp />
      <Text ml={6}>reply</Text>
    </Box>
  );
};
