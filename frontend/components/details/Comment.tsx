import { ActionIcon, Box, Paper, Text } from "@mantine/core";
import { IconArrowBackUp, IconTrash } from "@tabler/icons";
import { forwardRef } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { CommentData } from "../../hooks/api/helpers";
import { contentSx, paperSx, repliesBoxSx, replyButtonSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { ShowRepliesButton } from "./_showRepliesButton";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data }: Props, ref) => {
  const { user } = useAuth();
  const hasReplies = data.replies_count > 0;
  const isDeleteable = user?.is_admin || data.author.id === user?.id;

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
          {hasReplies && <ShowRepliesButton comment={data} />}
          {isDeleteable && (
            <ActionIcon ml="auto" aria-label="delete comment">
              <IconTrash />
            </ActionIcon>
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
