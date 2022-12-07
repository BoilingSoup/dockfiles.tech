import {
  EnvironmentDetailsData,
  getAllEnvironmentPaths,
  getEnvironmentByStringId,
  getEnvironmentReadMe,
} from "../../hooks/api/helpers";
import markdownToHtml from "../../lib/markdownToHtml";
import { markdownClass } from "../../contexts/MantineProvider";
import { Box, Container, Text } from "@mantine/core";
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
      <Container className={markdownClass}>
        <Text component="h3" style={{ fontSize: "2rem" }}>
          Git clone
        </Text>
        <Container>
          <pre>{`git clone https://github.com/${environment.repo_owner}/${environment.repo_name}`}</pre>
        </Container>
      </Container>
      <Container>
        <Text component="h3" style={{ fontSize: "2rem" }}>
          README.md
        </Text>
        <Container
          style={{ border: "1px solid black" }}
          className={markdownClass}
          dangerouslySetInnerHTML={{ __html: environment.readMe }}
        />
      </Container>
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
