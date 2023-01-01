import { Container } from "@mantine/core";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { COMMENTS, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
import { useInfiniteScrollComments } from "../../hooks/api/useInfiniteScrollComments";
import { useStringId } from "../../hooks/api/useStringId";

const Comments = () => {
  const stringId = useStringId();
  const { comments } = useInfiniteScrollComments(stringId);
  return (
    <>
      <EnvironmentTabs active={COMMENTS} commentsCount={1000} />

      <Container style={{ whiteSpace: "pre-line" }}>{comments}</Container>

      <ScrollToTop />
    </>
  );
};

export default Comments;
