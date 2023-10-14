import { Box, Center, Loader, Pagination, Paper, Text, useMantineColorScheme } from "@mantine/core";
import { forwardRef, Fragment, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { DARK } from "../../contexts/ColorSchemeProvider";
import { CommentData, RepliesData, RepliesPage } from "../../hooks/api/helpers";
import { useDeleteCommentMutation } from "../../hooks/api/useDeleteCommentMutation";
import { contentSx, paperSx, repliesBoxSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { DeleteCommentButton } from "./_deleteCommentButton";
import { RepliesContainer } from "./_repliesContainer";
import { Reply } from "./_reply";
import { ReplyButton } from "./_replyButton";
import { ReplyTextArea } from "./_replyTextArea";
import { ShowRepliesButton } from "./_showRepliesButton";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data: comment }: Props, ref) => {
  const { user } = useAuth();

  // Get replies state management
  const [showReplies, setShowReplies] = useState(false);
  const toggleShowRepliesHandler = () => setShowReplies((prev) => !prev);
  const [repliesPageNum, setRepliesPageNum] = useState(1);

  const [repliesPage, setRepliesPage] = useState<RepliesPage | undefined>(undefined);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  // Derived state
  const hasReplies = comment.replies_count > 0;
  const isDeleteable = (src: CommentData | RepliesData) =>
    (user?.is_admin || src.author.id === user?.id) && !comment.is_deleted;

  const { mutate: deleteCommentMutation, isLoading } = useDeleteCommentMutation();

  // Post reply state management
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);
  const replyButtonClickHandler = () => setShowReplyTextArea(true);
  const hideReplyTextAreaHandler = () => setShowReplyTextArea(false);

  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === DARK;

  let contentColor = "";
  if (comment.is_deleted && isDarkMode) {
    contentColor = "gray.6";
  } else if (comment.is_deleted && !isDarkMode) {
    contentColor = "gray.7";
  }

  const commentBody = (
    <>
      <Paper sx={paperSx}>
        <CommentUserInfo author={comment.author.name} avatar={comment.author.avatar} created_at={comment.created_at} />
        <Text sx={contentSx} component="p" italic={comment.is_deleted} color={contentColor}>
          {comment.content}
        </Text>
        <Box sx={repliesBoxSx}>
          {user?.email_verified_at && <ReplyButton onClick={replyButtonClickHandler} />}

          {hasReplies && (
            <ShowRepliesButton
              onClick={toggleShowRepliesHandler}
              onLoadingStateChange={setIsLoadingReplies}
              onRepliesDataStateChange={setRepliesPage}
              comment={comment}
              isToggled={showReplies}
              repliesPageNum={repliesPageNum}
            />
          )}
          {isDeleteable(comment) && !isLoading && (
            <DeleteCommentButton onClick={() => deleteCommentMutation(comment)} />
          )}
          {isLoading && <Loader ml="auto" size={20} />}
        </Box>
      </Paper>
      {showReplyTextArea && (
        <RepliesContainer>
          <ReplyTextArea
            onHide={hideReplyTextAreaHandler}
            comment={comment}
            onReply={(repliesPage: RepliesPage) => {
              setRepliesPage(repliesPage);
              setShowReplies(true);
            }}
          />
        </RepliesContainer>
      )}
      {isLoadingReplies && showReplies && (
        <Center>
          <Loader />
        </Center>
      )}
      {showReplies && (
        <RepliesContainer>
          <Fragment>
            {repliesPage?.data.data.map((reply) => (
              <Reply key={reply.id} data={reply} comment={comment} />
            ))}
            {repliesPage && repliesPage.data.last_page > 1 && (
              <Center>
                <Pagination page={repliesPageNum} onChange={setRepliesPageNum} total={repliesPage.data.last_page} />
              </Center>
            )}
          </Fragment>
        </RepliesContainer>
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
