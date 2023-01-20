import { EnvironmentDetailsData, getEnvironmentByStringId, getEnvironmentReadMe } from "../../hooks/api/helpers";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";
import { EnvironmentTabs, README } from "../../components/details/EnvironmentTabs";
import { useStringId } from "../../hooks/helpers/useStringId";
import { Container, Text } from "@mantine/core";
import { markdownClass } from "../../contexts/MantineProvider";
import { usePrefetchComments } from "../../hooks/api/usePrefetchComments";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { useCommentsCount } from "../../hooks/api/useCommentsCount";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSetEnvironmentDetailsInitialData } from "../../hooks/api/useSetEnvironmentDetailsInitialData";
import { SITE_NAME } from "../../config/config";
import { ActionButtonsGroup } from "../../components/details/ActionButtonsGroup";
import { useAuth } from "../../contexts/AuthProvider";
import { LikeButton } from "../../components/details/LikeButton";
import { BookmarkButton } from "../../components/details/BookmarkButton";

type Props = {
  environment: EnvironmentDetailsData & {
    readMe: string;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const stringId = ctx.params!.string_id as string;
  const data = await getEnvironmentByStringId(stringId);

  const repoName = data.data.repo_name;
  const repoOwner = data.data.repo_owner;
  const repoBranch = data.data.repo_branch;
  const readMeUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${repoBranch}/README.md`;

  const readMe = await markdownToHtml(await getEnvironmentReadMe(readMeUrl));

  return {
    props: { environment: { ...data.data, readMe } },
  };
};

const Environment = ({ environment }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuth();

  const stringId = useStringId();
  const { count, isLoading } = useCommentsCount(stringId);
  usePrefetchComments(stringId);
  useSetEnvironmentDetailsInitialData({ stringId, environment });

  return (
    <>
      <Head>
        <title>
          {SITE_NAME} | {environment.name}
        </title>
      </Head>

      <EnvironmentTabs active={README} commentsCount={{ count, isLoading }} />

      {user && (
        <ActionButtonsGroup
          buttons={
            <>
              <LikeButton id={environment.id} />
              <BookmarkButton id={environment.id} />
            </>
          }
        />
      )}

      <Container>
        <Text component="h3" style={{ fontSize: "2rem" }}>
          README.md
        </Text>
        <Container className={markdownClass} dangerouslySetInnerHTML={{ __html: environment.readMe }} />
      </Container>

      <ScrollToTop />
    </>
  );
};

export default Environment;
