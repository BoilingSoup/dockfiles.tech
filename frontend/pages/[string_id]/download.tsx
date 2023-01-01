import { Button, Center, Container, Divider, Text, useMantineTheme } from "@mantine/core";
import { Params } from ".";
import { DOWNLOAD, EnvironmentTabs } from "../../components/home/EnvironmentTabs";
import { CodeBlock } from "../../components/home/_codeBlock";
import { EnvironmentDetailsData, getAllEnvironmentPaths, getEnvironmentByStringId } from "../../hooks/api/helpers";
import { usePrefetchComments } from "../../hooks/api/usePrefetchComments";
import { useStringId } from "../../hooks/api/useStringId";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

type Props = {
  environment: EnvironmentDetailsData;
};

const Download = ({ environment }: Props) => {
  const stringId = useStringId();
  usePrefetchComments(stringId);

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
      <EnvironmentTabs active={DOWNLOAD} commentsCount={1000} />

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
