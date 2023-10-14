import { Box, Loader, Paper, Text, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { DARK } from "../../contexts/ColorSchemeProvider";
import { CommentData, RepliesData } from "../../hooks/api/helpers";
import { CommentResponse } from "../../hooks/api/types";
import { useDeleteReplyMutation } from "../../hooks/api/useDeleteReplyMutation";
import { contentSx, repliesBoxSx, replySx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { DeleteCommentButton } from "./_deleteCommentButton";
import { ReplyButton } from "./_replyButton";
import { ReplyTextArea } from "./_replyTextArea";

type Props = {
  data: RepliesData;
  comment: CommentData | CommentResponse;
  pageNum: number;
};

export const Reply = ({ data: reply, comment, pageNum }: Props) => {
  const { user } = useAuth();
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);

  const replyButtonClickHandler = () => setShowReplyTextArea(true);
  const hideReplyTextAreaHandler = () => setShowReplyTextArea(false);

  const isDeleteable = (src: RepliesData) => user?.is_admin || src.author.id === user?.id;
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === DARK;

  const { mutate: deleteReplyMutation, isLoading } = useDeleteReplyMutation();

  const handleDelete = () => {
    deleteReplyMutation({ comment_id: comment.id, reply_id: reply.id, pageNum });
  };

  return (
    <>
      <Paper sx={replySx}>
        <CommentUserInfo author={reply.author.name} avatar={reply.author.avatar} created_at={reply.created_at} />
        <Text sx={contentSx} component="p">
          {reply.is_meta && (
            <Text component="span" color={isDarkMode ? "blue" : "violet"}>
              @{reply.recipient.name}{" "}
            </Text>
          )}
          {reply.is_deleted ? (
            <Text italic color={isDarkMode ? "gray.6" : "gray.7"}>
              {reply.content}
            </Text>
          ) : (
            reply.content
          )}
        </Text>
        <Box sx={repliesBoxSx}>
          <ReplyButton onClick={replyButtonClickHandler} />
          {isLoading && <Loader ml="auto" size={20} />}
          {!isLoading && isDeleteable(reply) && !reply.is_deleted && <DeleteCommentButton onClick={handleDelete} />}
        </Box>
      </Paper>
      {showReplyTextArea && <ReplyTextArea onHide={hideReplyTextAreaHandler} comment={comment} reply={reply} />}
    </>
  );
};
