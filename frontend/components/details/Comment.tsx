import { Avatar, CSSObject, Group, Image, MantineTheme, Paper, Text } from "@mantine/core";
import { forwardRef } from "react";
import { CommentData } from "../../hooks/api/helpers";
import { paperSx } from "./styles";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data }: Props, ref) => {
  const commentBody = (
    <Paper sx={paperSx}>
      <Group>
        <Avatar src={data.avatar} alt="user avatar" radius="xl" style={{ border: "1px solid white" }} />
        <Text component="h2">{data.name}</Text>
      </Group>
      <p>{data.content}</p>
    </Paper>
  );

  let content: JSX.Element;

  if (ref) {
    content = <article ref={ref}>{commentBody}</article>;
  } else {
    content = <article>{commentBody}</article>;
  }

  return content;
});

Comment.displayName = "Comment";
