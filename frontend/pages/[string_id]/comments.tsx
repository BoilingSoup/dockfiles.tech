import { Container } from "@mantine/core";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { COMMENTS, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
import { useCommentsCount } from "../../hooks/api/useCommentsCount";
import { useInfiniteScrollComments } from "../../hooks/api/useInfiniteScrollComments";
import { useStringId } from "../../hooks/api/useStringId";

const Comments = () => {
  const stringId = useStringId();
  const { comments } = useInfiniteScrollComments(stringId);
  const { count, isLoading } = useCommentsCount(stringId);
  return (
    <>
      <EnvironmentTabs active={COMMENTS} commentsCount={{ count, isLoading }} />

      <Container style={{ whiteSpace: "pre-line" }}>{comments}</Container>

      <ScrollToTop />
    </>
  );
};

export default Comments;
