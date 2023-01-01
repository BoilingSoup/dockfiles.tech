import { Button, Center, Container, Text } from "@mantine/core";
import { Params } from ".";
import { Divider } from "../../components/common/Divider";
import { DOWNLOAD, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
import { CodeBlock } from "../../components/details/CodeBlock";
import { EnvironmentDetailsData, getAllEnvironmentPaths, getEnvironmentByStringId } from "../../hooks/api/helpers";
import { usePrefetchComments } from "../../hooks/api/usePrefetchComments";
import { useStringId } from "../../hooks/api/useStringId";
import { buttonSx } from "../../components/common/styles";

type Props = {
  environment: EnvironmentDetailsData;
};

const Download = ({ environment }: Props) => {
  const stringId = useStringId();
  usePrefetchComments(stringId);

  const directLink = `https://github.com/${environment.repo_owner}/${environment.repo_name}/archive/${environment.repo_branch}.zip`;

  return (
    <>
      <EnvironmentTabs active={DOWNLOAD} commentsCount={undefined} />

      <Container>
        <CodeBlock
          title="Git clone"
          code={`git clone https://github.com/${environment.repo_owner}/${environment.repo_name}`}
        />
        <Divider />

        <CodeBlock title="Curl" code={`curl -L -O ${directLink}`} />
        <Divider />

        <CodeBlock title="Wget" code={`wget ${directLink}`} />
        <Divider />

        <Center mt={46} style={{ display: "flex", alignItems: "center" }}>
          <Text component="h3" style={{ fontSize: "2rem", display: "inline" }}>
            or Download zip
          </Text>
          <Button size="md" ml={50} sx={buttonSx}>
            Download
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default Download;

export const getStaticProps = async ({ params }: Params): Promise<{ props: Props }> => {
  const stringId = params.string_id;
  const data = await getEnvironmentByStringId(stringId);

  return {
    props: { environment: data.data },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllEnvironmentPaths();

  return {
    paths,
    fallback: false,
  };
};
