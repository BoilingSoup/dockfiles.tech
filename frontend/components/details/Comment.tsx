import { Box, Center, Pagination, Paper, Text } from "@mantine/core";
import { forwardRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { CommentData, RepliesData } from "../../hooks/api/helpers";
import { useReplies } from "../../hooks/api/useReplies";
import { contentSx, paperSx, repliesBoxMarginLeft, repliesBoxSx, replySx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { DeleteCommentButton } from "./_deleteCommentButton";
import { ReplyButton } from "./_replyButton";
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
  const isDeleteable = (src: CommentData | RepliesData) => user?.is_admin || src.author.id === user?.id;

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
          <ReplyButton />
          {hasReplies && (
            <ShowRepliesButton
              onMouseOver={mouseOverHandler}
              onClick={clickHandler}
              comment={comment}
              isToggled={showReplies}
            />
          )}
          {isDeleteable(comment) && <DeleteCommentButton />}
        </Box>
      </Paper>
      {showReplies && (
        <Box ml={repliesBoxMarginLeft}>
          {data?.data.data.map((reply) => (
            <Paper key={reply.id} sx={replySx}>
              <CommentUserInfo author={reply.author.name} avatar={reply.author.avatar} created_at={reply.created_at} />
              <Text sx={contentSx} component="p">
                {reply.content}
              </Text>
              <Box sx={repliesBoxSx}>
                <ReplyButton />
                {isDeleteable(reply) && <DeleteCommentButton />}
              </Box>
            </Paper>
          ))}
          {showReplies && (
            <Center>
              <Pagination page={1} onChange={() => {}} total={10} />
            </Center>
          )}
        </Box>
      )}
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
