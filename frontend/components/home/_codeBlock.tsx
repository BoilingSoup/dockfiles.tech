import { Container, Text } from "@mantine/core";
import { markdownClass } from "../../contexts/MantineProvider";

type Props = {
  code: string;
  title: string;
};

export const CodeBlock = ({ code, title }: Props) => {
  return (
    <Container className={markdownClass}>
      <Text component="h3" style={{ fontSize: "2rem" }}>
        {title}
      </Text>
      <Container>
        <pre>{code}</pre>
      </Container>
    </Container>
  );
};
