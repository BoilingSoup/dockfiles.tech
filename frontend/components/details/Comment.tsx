import { ActionIcon, Box, Paper, Text } from "@mantine/core";
import { IconArrowBackUp, IconTrash } from "@tabler/icons";
import { forwardRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { CommentData } from "../../hooks/api/helpers";
import { useReplies } from "../../hooks/api/useReplies";
import { contentSx, paperSx, repliesBoxSx, replyButtonSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { ShowRepliesButton } from "./_showRepliesButton";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data: comment }: Props, ref) => {
  const { user } = useAuth();

  const [fetchReplies, setFetchReplies] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { data } = useReplies({ commentId: comment.id, fetchReplies });

  const hasReplies = comment.replies_count > 0;
  const isDeleteable = user?.is_admin || comment.author.id === user?.id;

  const mouseOverHandler = () => setFetchReplies(true);
  const clickHandler = () => setShowReplies((prev) => !prev);

  const commentBody = (
    <>
      <Paper sx={paperSx}>
        <CommentUserInfo author={comment.author.name} avatar={comment.author.avatar} created_at={comment.created_at} />
        <Text sx={contentSx} component="p">
          {comment.content}
        </Text>
        <Box sx={repliesBoxSx}>
          <Box component="button" sx={replyButtonSx}>
            <IconArrowBackUp />
            <Text ml={6}>reply</Text>
          </Box>
          {hasReplies && <ShowRepliesButton onMouseOver={mouseOverHandler} onClick={clickHandler} comment={comment} />}
          {isDeleteable && (
            <ActionIcon ml="auto" aria-label="delete comment">
              <IconTrash />
            </ActionIcon>
          )}
        </Box>
      </Paper>
      {showReplies && data?.data.data.map((reply) => <Paper sx={paperSx}>{JSON.stringify(reply.content)}</Paper>)}
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
