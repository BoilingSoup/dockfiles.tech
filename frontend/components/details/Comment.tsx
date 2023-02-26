import { Box, Center, Loader, Pagination, Paper, Text } from "@mantine/core";
import { forwardRef, Fragment, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { CommentData, RepliesData } from "../../hooks/api/helpers";
import { useReplies } from "../../hooks/api/useReplies";
import { contentSx, paperSx, repliesBoxSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";
import { DeleteCommentButton } from "./_deleteCommentButton";
import { RepliesContainer } from "./_repliesContainer";
import { Reply } from "./_reply";
import { ReplyButton } from "./_replyButton";
import { ShowRepliesButton } from "./_showRepliesButton";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data: comment }: Props, ref) => {
  const { user } = useAuth();

  // Get replies state management
  const [fetchRepliesEnabled, setFetchRepliesEnabled] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesPage, setRepliesPage] = useState(1);
  const { data: repliesData, isLoading: isLoadingReplies } = useReplies({
    commentId: comment.id,
    page: repliesPage,
    enabled: fetchRepliesEnabled,
  });
  const hasReplies = comment.replies_count > 0;
  const isDeleteable = (src: CommentData | RepliesData) => user?.is_admin || src.author.id === user?.id;
  const enableFetchRepliesHandler = () => setFetchRepliesEnabled(true);
  const toggleShowRepliesHandler = () => setShowReplies((prev) => !prev);

  // Post reply state management
  // const [showReplyForm, setShowReplyForm] = useState(false);
  // const showReplyFormHandler = () => setShowReplyForm(true);

  const commentBody = (
    <>
      <Paper sx={paperSx}>
        <CommentUserInfo author={comment.author.name} avatar={comment.author.avatar} created_at={comment.created_at} />
        <Text sx={contentSx} component="p">
          {comment.content}
        </Text>
        <Box sx={repliesBoxSx}>
          <ReplyButton onClick={() => {}} />
          {hasReplies && (
            <ShowRepliesButton
              onMouseOver={enableFetchRepliesHandler}
              onClick={toggleShowRepliesHandler}
              comment={comment}
              isToggled={showReplies}
            />
          )}
          {isDeleteable(comment) && <DeleteCommentButton />}
        </Box>
      </Paper>
      {isLoadingReplies && showReplies && (
        <Center>
          <Loader />
        </Center>
      )}
      {showReplies && (
        <RepliesContainer>
          <Fragment>
            {repliesData?.data.data.map((reply) => (
              <Reply key={reply.id} data={reply} />
            ))}
            {repliesData && repliesData.data.last_page > 1 && (
              <Center>
                <Pagination page={repliesPage} onChange={setRepliesPage} total={repliesData.data.last_page} />
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
