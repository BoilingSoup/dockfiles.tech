import { Button, Container, Flex, Textarea } from "@mantine/core";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { COMMENTS, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
import { commentsMargin } from "../../components/details/styles";
import { useCommentsCount } from "../../hooks/api/useCommentsCount";
import { useEnvironmentDetails } from "../../hooks/api/useEnvironmentDetails";
import { useInfiniteScrollComments } from "../../hooks/api/useInfiniteScrollComments";
import { useStringId } from "../../hooks/helpers/useStringId";

const Comments = () => {
  const stringId = useStringId();
  const { comments } = useInfiniteScrollComments(stringId);
  const { count, isLoading } = useCommentsCount(stringId);
  useEnvironmentDetails(stringId);

  return (
    <>
      <EnvironmentTabs active={COMMENTS} commentsCount={{ count, isLoading }} />

      <Container style={{ whiteSpace: "pre-line" }}>
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
        {comments}
      </Container>

      <ScrollToTop />
    </>
  );
};

export default Comments;
