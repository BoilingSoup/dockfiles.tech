import { Button, Paper, Textarea } from "@mantine/core";
import { useAuth } from "../../contexts/AuthProvider";
import { commentsMargin, paperSx } from "./styles";
import { CommentUserInfo } from "./_commentUserInfo";

export const CommentTextArea = () => {
  const { user } = useAuth();

  if (!user) {
    return <> </>;
  }

  return (
    <Paper sx={paperSx}>
      <CommentUserInfo avatar={user.avatar} author={user.name} />
      <Textarea
        size="md"
        minRows={4}
        m={commentsMargin}
        placeholder="Your comment"
        aria-label="Your comment"
        withAsterisk
      />
      <Button px={40} ml="auto" mr={commentsMargin}>
        Submit
      </Button>
    </Paper>
  );
};
