import { Button, Center, Container, Divider, Group, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { Props as EnvironmentProps } from "../../pages/[string_id]";
import { CodeBlock } from "./_codeBlock";

export const DownloadTab = ({ environment }: EnvironmentProps) => {
  const directLink = `https://github.com/${environment.repo_owner}/${environment.repo_name}/archive/${environment.repo_branch}.zip`;

  return (
    <>
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
          <Button size="md" ml={50}>
            Download
          </Button>
        </Center>
      </Container>
    </>
  );
};
