import { Button, Center, Container, Text } from "@mantine/core";
import { Divider } from "../../components/common/Divider";
import { DOWNLOAD, EnvironmentTabs } from "../../components/details/EnvironmentTabs";
import { CodeBlock } from "../../components/details/CodeBlock";
import { usePrefetchComments } from "../../hooks/api/usePrefetchComments";
import { useStringId } from "../../hooks/helpers/useStringId";
import { buttonSx } from "../../components/common/styles";
import { useCommentsCount } from "../../hooks/api/useCommentsCount";
import { useEnvironmentDetails } from "../../hooks/api/useEnvironmentDetails";
import { NextPage } from "next";
import NoSSR from "../../components/common/NoSSR";

const Download: NextPage = () => {
  const stringId = useStringId();
  const { count, isLoading: commentsCountIsLoading } = useCommentsCount(stringId);
  const { data, isLoading } = useEnvironmentDetails(stringId);
  usePrefetchComments(stringId);

  const directLink = data
    ? `https://github.com/${data?.repo_owner}/${data?.repo_name}/archive/${data?.repo_branch}.zip`
    : null;

  return (
    <NoSSR>
      <>
        <EnvironmentTabs active={DOWNLOAD} commentsCount={{ count, isLoading: commentsCountIsLoading }} />

        <Container>
          <CodeBlock
            title="Git clone"
            code={`git clone https://github.com/${data?.repo_owner}/${data?.repo_name}`}
            isLoading={isLoading}
          />
          <Divider />

          <CodeBlock title="Curl" code={`curl -L -O ${directLink}`} isLoading={isLoading} />
          <Divider />

          <CodeBlock title="Wget" code={`wget ${directLink}`} isLoading={isLoading} />
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
    </NoSSR>
  );
};

export default Download;
