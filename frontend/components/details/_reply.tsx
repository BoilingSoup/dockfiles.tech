import { Box, Paper, Text, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { DARK } from "../../contexts/ColorSchemeProvider";
import { CommentData, RepliesData } from "../../hooks/api/helpers";
import { contentSx, repliesBoxSx, replySx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { DeleteCommentButton } from "./_deleteCommentButton";
import { ReplyButton } from "./_replyButton";
import { ReplyTextArea } from "./_replyTextArea";

type Props = {
  data: RepliesData;
  comment: CommentData;
};

export const Reply = ({ data: reply, comment }: Props) => {
  const { user } = useAuth();
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);

  const replyButtonClickHandler = () => setShowReplyTextArea(true);
  const hideReplyTextAreaHandler = () => setShowReplyTextArea(false);

  const isDeleteable = (src: RepliesData) => user?.is_admin || src.author.id === user?.id;
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === DARK;

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
          {reply.content}
        </Text>
        <Box sx={repliesBoxSx}>
          <ReplyButton onClick={replyButtonClickHandler} />
          {isDeleteable(reply) && <DeleteCommentButton />}
        </Box>
      </Paper>
      {showReplyTextArea && <ReplyTextArea onHide={hideReplyTextAreaHandler} comment={comment} reply={reply} />}
    </>
  );
};
