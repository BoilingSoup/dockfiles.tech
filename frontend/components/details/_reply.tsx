import { Box, Paper, Text } from "@mantine/core";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { RepliesData } from "../../hooks/api/helpers";
import { CommentTextArea } from "./CommentTextArea";
import { contentSx, repliesBoxSx, replySx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { DeleteCommentButton } from "./_deleteCommentButton";
import { ReplyButton } from "./_replyButton";

type Props = {
  data: RepliesData;
};

export const Reply = ({ data: reply }: Props) => {
  const { user } = useAuth();
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);

  const replyButtonClickHandler = () => setShowReplyTextArea(true);

  const isDeleteable = (src: RepliesData) => user?.is_admin || src.author.id === user?.id;

  return (
    <>
      <Paper sx={replySx}>
        <CommentUserInfo author={reply.author.name} avatar={reply.author.avatar} created_at={reply.created_at} />
        <Text sx={contentSx} component="p">
          {reply.content}
        </Text>
        <Box sx={repliesBoxSx}>
          <ReplyButton onClick={replyButtonClickHandler} />
          {isDeleteable(reply) && <DeleteCommentButton />}
        </Box>
      </Paper>
      {showReplyTextArea && <CommentTextArea ml={0} />}
    </>
  );
};
