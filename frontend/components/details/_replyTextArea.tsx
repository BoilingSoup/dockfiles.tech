import { Button, Group, Loader, Paper, Text, Textarea, useMantineTheme } from "@mantine/core";
import { ChangeEventHandler, FormEvent, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { AttemptPostReplyMetadata, CommentData, RepliesData, RepliesPage } from "../../hooks/api/helpers";
import { CommentResponse } from "../../hooks/api/types";
import { usePostReplyMutation } from "../../hooks/api/usePostReplyMutation";
import { useStringId } from "../../hooks/helpers/useStringId";
import { initialCharCountText } from "./CommentTextArea";
import { MAX_COMMENT_LENGTH } from "./constants";
import { commentsMargin, replySx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";

type Props = {
  onHide: () => void;
  comment: CommentData | CommentResponse;
  reply?: RepliesData;
  onReply?: (repliesPage: RepliesPage) => void;
};

export const ReplyTextArea = ({ onHide: hideTextAreaHandler, comment, reply, onReply: showRepliesHandler }: Props) => {
  const { user } = useAuth();
  const stringId = useStringId();
  const { mutate: postReplyMutation, isLoading } = usePostReplyMutation();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const charCountTextRef = useRef<HTMLParagraphElement>(null);
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false);

  const { colors } = useMantineTheme();

  if (!user) {
    return <> </>;
  }

  const textAreaChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const currCommentLength = event.target.value.trim().length;
    if (charCountTextRef.current !== null) {
      charCountTextRef.current.innerText = `${MAX_COMMENT_LENGTH - currCommentLength}/${MAX_COMMENT_LENGTH}`;
    }

    const isMinCommentLength = currCommentLength >= 4;
    const isMaxCommentLength = currCommentLength <= 200;
    const isValidCommentLength = isMinCommentLength && isMaxCommentLength;

    if (buttonIsEnabled && !isValidCommentLength) {
      setButtonIsEnabled(false);
      return;
    }

    if (!buttonIsEnabled && isValidCommentLength) {
      setButtonIsEnabled(true);
      return;
    }
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (textAreaRef.current) {
      const payload: AttemptPostReplyMetadata = {
        stringId,
        charCountTextRef,
        textAreaRef,
        setButtonIsEnabled,
        body: {
          content: textAreaRef.current.value.trim(),
          recipient_id: reply !== undefined ? reply.author.id.toString() : undefined,
        },
        recipient: {
          id: reply?.author.id ?? comment.author.id,
          name: reply?.author.name ?? comment.author.name,
        },
        is_meta: reply !== undefined,
        comment,
        hideTextAreaHandler,
        showRepliesHandler,
      };
      postReplyMutation(payload);
    }
  };

  return (
    <Paper ml={0} sx={replySx} pb={14}>
      <CommentUserInfo avatar={user.avatar} author={user.name} />
      <form onSubmit={submitHandler}>
        <Textarea
          ref={textAreaRef}
          onChange={textAreaChangeHandler}
          size="md"
          minRows={4}
          mx={commentsMargin}
          mb={commentsMargin}
          placeholder="Reply to the comment"
          aria-label="Reply to the comment above"
          withAsterisk
          disabled={isLoading}
        />
        <Group ml={commentsMargin}>
          <Text ml={commentsMargin} component="p" ref={charCountTextRef}>
            {initialCharCountText}
          </Text>
          <Button ml="auto" onClick={hideTextAreaHandler}>
            Cancel
          </Button>
          <Button type="submit" disabled={!buttonIsEnabled || isLoading} display="block" px={40} mr={commentsMargin}>
            {isLoading ? <Loader color={colors.navy[6]} size="sm" /> : "Submit"}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
