import { Button, Flex, Textarea } from "@mantine/core";
import { commentsMargin } from "./styles";

export const CommentTextArea = () => {
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Textarea
        size="md"
        minRows={4}
        m={commentsMargin}
        placeholder="Your comment"
        aria-label="Your comment"
        withAsterisk
      />
      <Button px={50} ml="auto" mr={commentsMargin}>
        Submit
      </Button>
    </Flex>
  );
};
