import { Container } from "@mantine/core";
import { COMMENTS, EnvironmentTabs } from "../../components/home/EnvironmentTabs";
import { useInfiniteScrollComments } from "../../hooks/api/useInfiniteScrollComments";
import { useStringId } from "../../hooks/api/useStringId";

const Comments = () => {
  const stringId = useStringId();
  const { comments } = useInfiniteScrollComments(stringId);
  return (
    <>
      <EnvironmentTabs
        // readMe={<ReadMeTab environment={environment} />}
        // download={<DownloadTab environment={environment} />}
        // comments={<CommentTab content={comments} />}
        active={COMMENTS}
        commentsCount={1000}
      />
      <Container style={{ whiteSpace: "pre-line" }}>{comments}</Container>
    </>
  );
};

export default Comments;
