import { Box, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { CommentData } from "../../hooks/api/helpers";
import { expandRepliesSx } from "./styles";

type Props = {
  comment: CommentData;
  onMouseOver: () => void;
  onClick: () => void;
};

export const ShowRepliesButton = ({ comment, onMouseOver: mouseOverHandler, onClick: clickHandler }: Props) => {
  return (
    <>
      <Box onClick={clickHandler} onMouseOver={mouseOverHandler} component="button" ml={40} sx={expandRepliesSx}>
        <IconChevronDown />
        <Text ml={4}>
          {comment.replies_count > 1 && `${comment.replies_count} replies`}
          {comment.replies_count === 1 && `${comment.replies_count} reply`}
        </Text>
      </Box>
    </>
  );
};
