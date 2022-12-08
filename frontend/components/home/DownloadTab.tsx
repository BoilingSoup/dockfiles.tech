import { Button, Center, Container, Divider, Text, useMantineTheme } from "@mantine/core";
import { Props as EnvironmentProps } from "../../pages/[string_id]";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";
import { CodeBlock } from "./_codeBlock";

export const DownloadTab = ({ environment }: EnvironmentProps) => {
  const directLink = `https://github.com/${environment.repo_owner}/${environment.repo_name}/archive/${environment.repo_branch}.zip`;
  const { colors, colorScheme } = useMantineTheme();

  const divider = (
    <Divider
      size="xs"
      color={colorSchemeHandler(colorScheme, {
        light: colors.slate[2],
        dark: colors.slate[8],
      })}
    />
  );

  return (
    <>
      <Container>
        <CodeBlock
          title="Git clone"
          code={`git clone https://github.com/${environment.repo_owner}/${environment.repo_name}`}
        />
        {divider}

        <CodeBlock title="Curl" code={`curl -L -O ${directLink}`} />
        {divider}

        <CodeBlock title="Wget" code={`wget ${directLink}`} />
        {divider}

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
