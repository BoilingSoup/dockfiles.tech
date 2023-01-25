import { Box, Paper, Text } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown } from "@tabler/icons";
import { forwardRef } from "react";
import { CommentData } from "../../hooks/api/helpers";
import { contentSx, expandRepliesSx, paperSx, repliesBoxSx, replyButtonSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data }: Props, ref) => {
  const commentBody = (
    <>
      <Paper sx={paperSx}>
        <CommentUserInfo author={data.author.name} avatar={data.author.avatar} created_at={data.created_at} />
        <Text sx={contentSx} component="p">
          {data.content}
        </Text>
        <Box sx={repliesBoxSx}>
          <Box component="button" sx={replyButtonSx}>
            <IconArrowBackUp />
            <Text ml={6}>reply</Text>
          </Box>
          {data.replies_count > 0 && (
            <Box component="button" ml={40} sx={expandRepliesSx}>
              <IconChevronDown />
              <Text ml={4}>
                {data.replies_count > 1 && `${data.replies_count} replies`}
                {data.replies_count === 1 && `${data.replies_count} reply`}
              </Text>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );

  let content: JSX.Element;

  if (ref) {
    content = <article ref={ref}>{commentBody}</article>;
  } else {
    content = <article>{commentBody}</article>;
  }

  return content;
});

Comment.displayName = "Comment";
