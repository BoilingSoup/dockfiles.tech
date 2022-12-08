import {
  EnvironmentDetailsData,
  getAllEnvironmentPaths,
  getEnvironmentByStringId,
  getEnvironmentReadMe,
} from "../../hooks/api/helpers";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";
import { EnvironmentTabs } from "../../components/home/EnvironmentTabs";
import { DownloadTab } from "../../components/home/DownloadTab";
import { ReadMeTab } from "../../components/home/ReadMeTab";
import { CommentTab } from "../../components/home/CommentTab";

export type Props = {
  environment: EnvironmentDetailsData & {
    readMe: string;
  };
};

const Environment = ({ environment }: Props) => {
  return (
    <>
      <Head>
        <title>Dockfiles.io | {environment.name}</title>
      </Head>

      <EnvironmentTabs
        readMe={<ReadMeTab environment={environment} />}
        download={<DownloadTab environment={environment} />}
        comments={<CommentTab />}
      />
    </>
  );
};

export default Environment;

type Params = {
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
