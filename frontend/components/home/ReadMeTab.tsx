import { Container, Text } from "@mantine/core";
import { markdownClass } from "../../contexts/MantineProvider";
import { Props as EnvironmentProps } from "../../pages/[string_id]";

export const ReadMeTab = ({ environment }: EnvironmentProps) => {
  return (
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
  );
};
