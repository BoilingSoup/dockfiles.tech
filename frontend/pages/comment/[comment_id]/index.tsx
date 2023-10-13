import { Paper, useMantineColorScheme, Text, Box, Container, Loader } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { contentSx, repliesBoxSx, paperSx } from "../../../components/details/styles";
import { CommentUserInfo } from "../../../components/details/_commentUserInfo";
import { DeleteCommentButton } from "../../../components/details/_deleteCommentButton";
import { ReplyButton } from "../../../components/details/_replyButton";
import { useAuth } from "../../../contexts/AuthProvider";
import { DARK } from "../../../contexts/ColorSchemeProvider";
import { CommentResponse } from "../../../hooks/api/types";
import { useDeleteCommentMutation } from "../../../hooks/api/useDeleteCommentMutation";
import { useGetComment } from "../../../hooks/api/useGetComment";
import { useRedirectUnauthenticated } from "../../../hooks/helpers/useRedirectUnauthenticated";

const CommentPage: NextPage = () => {
  useRedirectUnauthenticated("/");

  const { user } = useAuth();

  const router = useRouter();
  const commentId = router.query.comment_id as string;

  const { data } = useGetComment(commentId);

  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === DARK;

  let contentColor = "";
  if (data?.is_deleted && isDarkMode) {
    contentColor = "gray.6";
  } else if (data?.is_deleted && !isDarkMode) {
    contentColor = "gray.7";
  }

  // Derived state
  const isDeleteable = (src: CommentResponse) => (user?.is_admin || src.author.id === user?.id) && !data?.is_deleted;

  // Post reply state management
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);
  const replyButtonClickHandler = () => setShowReplyTextArea(true);
  const hideReplyTextAreaHandler = () => setShowReplyTextArea(false);

  const { mutate: deleteCommentMutation, isLoading: isDeletingComment } = useDeleteCommentMutation();

  return (
    <article>
      <Container style={{ whiteSpace: "pre-line" }}>
        {data ? (
          <Paper sx={paperSx}>
            <CommentUserInfo author={data.author.name} avatar={data.author.avatar} created_at={data.created_at} />
            <Text sx={contentSx} component="p" italic={data.is_deleted} color={contentColor}>
              {data.content}
            </Text>
            <Box sx={repliesBoxSx}>
              <ReplyButton onClick={replyButtonClickHandler} />
              {isDeleteable(data) && !isDeletingComment && <DeleteCommentButton onClick={() => {}} />}
              {isDeletingComment && <Loader ml="auto" size={20} />}
            </Box>
          </Paper>
        ) : (
          <div />
        )}
      </Container>
    </article>
  );
};

export default CommentPage;
