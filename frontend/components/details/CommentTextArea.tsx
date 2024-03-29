import { Button, Group, Loader, Paper, Text, Textarea, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { ChangeEventHandler, FormEvent, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { DARK } from "../../contexts/ColorSchemeProvider";
import { AttemptPostCommentMetadata } from "../../hooks/api/helpers";
import { usePostCommmentMutation } from "../../hooks/api/usePostCommentMutation";
import { useStringId } from "../../hooks/helpers/useStringId";
import { MAX_COMMENT_LENGTH } from "./constants";
import { commentsMargin, paperSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";

export const initialCharCountText = `${MAX_COMMENT_LENGTH}/${MAX_COMMENT_LENGTH}`;

export const CommentTextArea = () => {
  const { user } = useAuth();
  const stringId = useStringId();
  const { mutate: postCommentMutation, isLoading } = usePostCommmentMutation();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const charCountTextRef = useRef<HTMLParagraphElement>(null);
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false);

  const { colors } = useMantineTheme();

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
      const payload: AttemptPostCommentMetadata = {
        stringId,
        charCountTextRef,
        textAreaRef,
        setButtonIsEnabled,
        body: {
          content: textAreaRef.current.value.trim(),
        },
      };
      postCommentMutation(payload);
    }
  };

  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === DARK;

  return (
    <Paper sx={paperSx} pb={14}>
      <CommentUserInfo avatar={user?.avatar} author={user?.name ?? ""} />
      <form onSubmit={submitHandler}>
        <Textarea
          ref={textAreaRef}
          onChange={textAreaChangeHandler}
          size="md"
          minRows={4}
          mx={commentsMargin}
          mb={commentsMargin}
          placeholder="Add a comment"
          aria-label="Add a comment"
          withAsterisk
          disabled={isLoading}
          styles={(theme) => ({
            input: {
              border: isDarkMode ? "" : `1px solid ${theme.colors.dark[3]}`,
              "::placeholder": {
                color: isDarkMode ? "" : "black",
              },
            },
          })}
        />
        <Group ml={commentsMargin}>
          <Text ml={commentsMargin} component="p" ref={charCountTextRef}>
            {initialCharCountText}
          </Text>
          <Button
            type="submit"
            disabled={!buttonIsEnabled || isLoading}
            display="block"
            px={40}
            ml="auto"
            mr={commentsMargin}
            sx={(theme) => ({
              ":disabled": {
                border: isDarkMode ? "" : `1px solid ${theme.colors.dark[1]}`,
                color: isDarkMode ? "" : theme.colors.dark[2],
              },
            })}
          >
            {isLoading ? <Loader color={colors.navy[6]} size="sm" /> : "Submit"}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
