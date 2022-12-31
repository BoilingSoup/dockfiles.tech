import { Container } from "@mantine/core";

type Props = {
  content: JSX.Element[][] | undefined;
};

export const CommentTab = ({ content }: Props) => {
  return <Container style={{ whiteSpace: "pre-line" }}>{content}</Container>;
};
