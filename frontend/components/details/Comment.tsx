import { Box, Center, Loader, Pagination, Paper, Text } from "@mantine/core";
import { forwardRef, Fragment, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { CommentData, RepliesData, RepliesPage } from "../../hooks/api/helpers";
import { COMMENT } from "./constants";
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
  const [repliesPage, setRepliesPage] = useState(1);

  const [repliesData, setRepliesData] = useState<RepliesPage | undefined>(undefined);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  // Derived state
  const hasReplies = comment.replies_count > 0;
  const isDeleteable = (src: CommentData | RepliesData) => user?.is_admin || src.author.id === user?.id;

  // Post reply state management
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);
  const replyButtonClickHandler = () => setShowReplyTextArea(true);
  const hideReplyTextAreaHandler = () => setShowReplyTextArea(false);

  const commentBody = (
    <>
      <Paper sx={paperSx}>
        <CommentUserInfo author={comment.author.name} avatar={comment.author.avatar} created_at={comment.created_at} />
        <Text sx={contentSx} component="p">
          {comment.content}
        </Text>
        <Box sx={repliesBoxSx}>
          <ReplyButton onClick={replyButtonClickHandler} />
          {hasReplies && (
            <ShowRepliesButton
              onClick={toggleShowRepliesHandler}
              onLoadingStateChange={setIsLoadingReplies}
              onRepliesDataStateChange={setRepliesData}
              comment={comment}
              isToggled={showReplies}
              repliesPage={repliesPage}
            />
          )}
          {isDeleteable(comment) && <DeleteCommentButton />}
        </Box>
      </Paper>
      {showReplyTextArea && (
        <RepliesContainer>
          <ReplyTextArea onHide={hideReplyTextAreaHandler} comment={comment} parentType={COMMENT} />
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
            {repliesData?.data.data.map((reply) => (
              <Reply key={reply.id} data={reply} comment={comment} />
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
