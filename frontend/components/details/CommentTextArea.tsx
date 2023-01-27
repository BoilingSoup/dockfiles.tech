import { Button, Group, Paper, Text, Textarea } from "@mantine/core";
import { BaseSyntheticEvent, useRef } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { MAX_COMMENT_LENGTH } from "./constants";
import { commentsMargin, paperSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";

export const CommentTextArea = () => {
  const { user } = useAuth();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  if (!user) {
    return <> </>;
  }

  const textAreaChangeHandler = (event: BaseSyntheticEvent) => {
    const currCommentLength = event.target.value.length;
    if (textRef.current !== null) {
      textRef.current.innerText = `${MAX_COMMENT_LENGTH - currCommentLength}/${MAX_COMMENT_LENGTH}`;
    }
  };

  return (
    <Paper sx={paperSx} pb={14}>
      <CommentUserInfo avatar={user.avatar} author={user.name} />
      <Textarea
        ref={textAreaRef}
        onChange={textAreaChangeHandler}
        size="md"
        minRows={4}
        mx={commentsMargin}
        mb={commentsMargin}
        placeholder="Your comment"
        aria-label="Your comment"
        withAsterisk
      />
      <Group ml={commentsMargin}>
        <Text ml={commentsMargin} component="p" ref={textRef}>
          {`${MAX_COMMENT_LENGTH}/${MAX_COMMENT_LENGTH}`}
        </Text>
        <Button display="block" px={40} ml="auto" mr={commentsMargin}>
          Submit
        </Button>
      </Group>
    </Paper>
  );
};
