import { ActionIcon, Box, Container, CopyButton, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons";
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
        <Box style={{ position: "relative" }}>
          <pre>{code}</pre>
          <Box style={{ position: "absolute", top: 5, right: 5 }}>
            <CopyButton value={code} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                  <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                    {copied ? <IconCheck size={30} /> : <IconCopy size={30} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};
