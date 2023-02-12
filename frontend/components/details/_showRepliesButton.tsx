import { Box, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { CommentData } from "../../hooks/api/helpers";
import { expandRepliesSx } from "./styles";

type Props = {
  comment: CommentData;
};

export const ShowRepliesButton = ({ comment }: Props) => {
  return (
    <Box component="button" ml={40} sx={expandRepliesSx}>
      <IconChevronDown />
      <Text ml={4}>
        {comment.replies_count > 1 && `${comment.replies_count} replies`}
        {comment.replies_count === 1 && `${comment.replies_count} reply`}
      </Text>
    </Box>
  );
};
