import {
  Paper,
  useMantineColorScheme,
  Text,
  Box,
  Container,
  Loader,
  Center,
  Pagination,
  Skeleton,
} from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { contentSx, repliesBoxSx, paperSx } from "../../../components/details/styles";
import { CommentUserInfo } from "../../../components/details/_commentUserInfo";
import { DeleteCommentButton } from "../../../components/details/_deleteCommentButton";
import { RepliesContainer } from "../../../components/details/_repliesContainer";
import { Reply } from "../../../components/details/_reply";
import { ReplyButton } from "../../../components/details/_replyButton";
import { ReplyTextArea } from "../../../components/details/_replyTextArea";
import { useAuth } from "../../../contexts/AuthProvider";
import { DARK } from "../../../contexts/ColorSchemeProvider";
import { CommentResponse } from "../../../hooks/api/types";
import { useDeleteCommentMutation } from "../../../hooks/api/useDeleteCommentMutation";
import { useGetComment } from "../../../hooks/api/useGetComment";
import { useReplies } from "../../../hooks/api/useReplies";
import { useRedirectUnauthenticated } from "../../../hooks/helpers/useRedirectUnauthenticated";
import { replySx } from "../../../components/details/styles";

const CommentPage: NextPage = () => {
  useRedirectUnauthenticated("/");

  const { user } = useAuth();

  const router = useRouter();
  const commentId = router.query.comment_id as string;

  const { data: comment, isLoading: isLoadingComment } = useGetComment(commentId);

  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === DARK;

  let contentColor = "";
  if (comment?.is_deleted && isDarkMode) {
    contentColor = "gray.6";
  } else if (comment?.is_deleted && !isDarkMode) {
    contentColor = "gray.7";
  }

  const [repliesPageNum, setRepliesPageNum] = useState(1);

  // Derived state
  const isDeleteable = (src: CommentResponse) => (user?.is_admin || src.author.id === user?.id) && !comment?.is_deleted;

  // Post reply state management
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);
  const replyButtonClickHandler = () => setShowReplyTextArea(true);
  const hideReplyTextAreaHandler = () => setShowReplyTextArea(false);

  const { mutate: deleteCommentMutation, isLoading: isDeletingComment } = useDeleteCommentMutation();

  const { data: replies, isLoading: isLoadingReplies } = useReplies({
    commentId: comment?.id ?? 0,
    page: repliesPageNum,
    enabled: comment !== undefined,
  });

  return (
    <Container style={{ whiteSpace: "pre-line" }}>
      {isLoadingComment && (
        <Paper sx={paperSx} bg="none">
          <Skeleton
            w="100%"
            h={175}
            sx={(theme) => ({
              "::before": { background: theme.colors.slate[7] },
              "::after": { background: theme.colors.slate[9] },
            })}
          />
        </Paper>
      )}

      {comment !== undefined && (
        <Paper sx={paperSx}>
          <CommentUserInfo
            author={comment.author.name}
            avatar={comment.author.avatar}
            created_at={comment.created_at}
          />
          <Text sx={contentSx} component="p" italic={comment.is_deleted} color={contentColor}>
            {comment.content}
          </Text>
          <Box sx={repliesBoxSx}>
            <ReplyButton onClick={replyButtonClickHandler} />
            {isDeleteable(comment) && !isDeletingComment && (
              <DeleteCommentButton onClick={() => deleteCommentMutation(comment)} />
            )}
            {isDeletingComment && <Loader ml="auto" size={20} />}
          </Box>
        </Paper>
      )}
      {comment !== undefined && showReplyTextArea && (
        <RepliesContainer>
          <ReplyTextArea onHide={hideReplyTextAreaHandler} comment={comment} />
        </RepliesContainer>
      )}
      {comment !== undefined && (
        <RepliesContainer>
          <>
            {replies?.data.data.map((reply) => (
              <Reply key={reply.id} data={reply} comment={comment} />
            ))}
            {replies && replies.data.last_page > 1 && (
              <Center>
                <Pagination page={repliesPageNum} onChange={setRepliesPageNum} total={replies.data.last_page} />
              </Center>
            )}
          </>
        </RepliesContainer>
      )}

      {(isLoadingComment || isLoadingReplies) && (
        <RepliesContainer>
          <>
            {new Array(3).fill(null).map(() => (
              <Paper sx={replySx} bg="none">
                <Skeleton
                  w="100%"
                  h={175}
                  sx={(theme) => ({
                    "::before": { background: theme.colors.slate[7] },
                    "::after": { background: theme.colors.slate[9] },
                  })}
                />
              </Paper>
            ))}
          </>
        </RepliesContainer>
      )}
    </Container>
  );
};

export default CommentPage;
