import {
  EnvironmentDetailsData,
  getAllEnvironmentPaths,
  getEnvironmentByStringId,
  getEnvironmentReadMe,
} from "../../hooks/api/helpers";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";
import { EnvironmentTabs, README } from "../../components/details/EnvironmentTabs";
import { useStringId } from "../../hooks/api/useStringId";
import { Container, Text } from "@mantine/core";
import { markdownClass } from "../../contexts/MantineProvider";
import { usePrefetchComments } from "../../hooks/api/usePrefetchComments";
import { ScrollToTop } from "../../components/common/ScrollToTop";
import { useCommentsCount } from "../../hooks/api/useCommentsCount";

export type Props = {
  environment: EnvironmentDetailsData & {
    readMe: string;
  };
};

const Environment = ({ environment }: Props) => {
  const stringId = useStringId();
  usePrefetchComments(stringId);
  const { count, isLoading } = useCommentsCount(stringId);

  return (
    <>
      <Head>
        <title>Dockfiles.io | {environment.name}</title>
      </Head>

      <EnvironmentTabs active={README} commentsCount={{ count, isLoading }} />

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

export type Params = {
  params: {
    string_id: string;
  };
};

export const getStaticProps = async ({ params }: Params): Promise<{ props: Props }> => {
  const stringId = params.string_id;
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

export const getStaticPaths = async () => {
  const paths = await getAllEnvironmentPaths();

  return {
    paths,
    fallback: false,
  };
};
