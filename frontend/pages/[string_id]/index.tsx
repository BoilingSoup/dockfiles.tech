import {
  EnvironmentDetailsData,
  getAllEnvironmentPaths,
  getEnvironmentByStringId,
  getEnvironmentReadMe,
} from "../../hooks/api/helpers";
import markdownToHtml from "../../lib/markdownToHtml";
import { markdownClass } from "../../contexts/MantineProvider";
import { Container } from "@mantine/core";
import Head from "next/head";

type Props = {
  environment: EnvironmentDetailsData & {
    readMe: string;
  };
};

const Environment = ({ environment }: Props) => {
  console.log(environment);
  return (
    <>
      <Head>
        <title>Dockfiles.io | {environment.name}</title>
      </Head>
      <Container
        style={{ border: "1px solid black" }}
        className={markdownClass}
        dangerouslySetInnerHTML={{ __html: environment.readMe }}
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
  console.log(readMe);

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
