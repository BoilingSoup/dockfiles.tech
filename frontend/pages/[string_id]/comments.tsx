import { Container } from "@mantine/core";
import NoSSR from "../../components/common/NoSSR";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { CommentTextArea } from "../../components/details/CommentTextArea";
import { COMMENTS, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
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
    <NoSSR>
      <>
        <EnvironmentTabs active={COMMENTS} commentsCount={{ count, isLoading }} />

        <Container style={{ whiteSpace: "pre-line" }}>
          <CommentTextArea />
          {comments}
        </Container>

        <ScrollToTop />
      </>
    </NoSSR>
  );
};

export default Comments;
