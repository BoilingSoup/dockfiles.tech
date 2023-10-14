import { Center, Container, Loader, Skeleton } from "@mantine/core";
import NoSSR from "../../components/common/NoSSR";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { CommentTextArea } from "../../components/details/CommentTextArea";
import { COMMENTS, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
import { sidebarSkeletonSx } from "../../components/layout/styles";
import { useAuth } from "../../contexts/AuthProvider";
import { useCommentsCount } from "../../hooks/api/useCommentsCount";
import { useEnvironmentDetails } from "../../hooks/api/useEnvironmentDetails";
import { useInfiniteScrollComments } from "../../hooks/api/useInfiniteScrollComments";
import { usePrefetchBookmarksInitialPage } from "../../hooks/api/usePrefetchBookmarksInitialPage";
import { useStringId } from "../../hooks/helpers/useStringId";

const Comments = () => {
  const { user } = useAuth();

  const stringId = useStringId();

  const { comments, isLoading: isLoadingComments, isFetchingNextPage } = useInfiniteScrollComments(stringId);
  const { count, isLoading: isLoadingCommentsCount } = useCommentsCount(stringId);
  useEnvironmentDetails(stringId);
  usePrefetchBookmarksInitialPage();

  return (
    <NoSSR>
      <>
        <EnvironmentTabs active={COMMENTS} commentsCount={{ count, isLoading: isLoadingCommentsCount }} />

        <Container style={{ whiteSpace: "pre-line" }}>
          {isLoadingComments &&
            new Array(7).fill(null).map((_, i) => <Skeleton key={i} w="100%" h={177} m={14} sx={sidebarSkeletonSx} />)}

          {user?.email_verified_at && <CommentTextArea />}
          {comments}
          {isFetchingNextPage && (
            <Center h={100}>
              <Loader variant="bars" />
            </Center>
          )}
        </Container>

        <ScrollToTop />
      </>
    </NoSSR>
  );
};

export default Comments;
