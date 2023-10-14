import { Container } from "@mantine/core";
import NoSSR from "../../components/common/NoSSR";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { CommentTextArea } from "../../components/details/CommentTextArea";
import { COMMENTS, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
import { useAuth } from "../../contexts/AuthProvider";
import { useCommentsCount } from "../../hooks/api/useCommentsCount";
import { useEnvironmentDetails } from "../../hooks/api/useEnvironmentDetails";
import { useInfiniteScrollComments } from "../../hooks/api/useInfiniteScrollComments";
import { usePrefetchBookmarksInitialPage } from "../../hooks/api/usePrefetchBookmarksInitialPage";
import { useStringId } from "../../hooks/helpers/useStringId";

const Comments = () => {
  const { user } = useAuth();

  const stringId = useStringId();

  const { comments } = useInfiniteScrollComments(stringId);
  const { count, isLoading } = useCommentsCount(stringId);
  useEnvironmentDetails(stringId);
  usePrefetchBookmarksInitialPage();

  return (
    <NoSSR>
      <>
        <EnvironmentTabs active={COMMENTS} commentsCount={{ count, isLoading }} />

        <Container style={{ whiteSpace: "pre-line" }}>
          {user?.email_verified_at && <CommentTextArea />}
          {comments}
        </Container>

        <ScrollToTop />
      </>
    </NoSSR>
  );
};

export default Comments;
