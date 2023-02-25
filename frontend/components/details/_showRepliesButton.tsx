import { Box, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { CommentData } from "../../hooks/api/helpers";
import { expandRepliesSx } from "./styles";

type Props = {
  comment: CommentData;
  onMouseOver: () => void;
  onClick: () => void;
  isToggled: boolean;
};

export const ShowRepliesButton = ({
  comment,
  onMouseOver: mouseOverHandler,
  onClick: clickHandler,
  isToggled,
}: Props) => {
  return (
    <>
      <Box onClick={clickHandler} onMouseOver={mouseOverHandler} component="button" ml={40} sx={expandRepliesSx}>
        {isToggled ? <IconChevronUp /> : <IconChevronDown />}
        <Text ml={4}>
          {comment.replies_count > 1 && `${comment.replies_count} replies`}
          {comment.replies_count === 1 && `${comment.replies_count} reply`}
        </Text>
      </Box>
    </>
  );
};
