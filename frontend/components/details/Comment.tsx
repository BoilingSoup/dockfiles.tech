import { Avatar, Box, Group, Paper, Text } from "@mantine/core";
import { forwardRef } from "react";
import { CommentData } from "../../hooks/api/helpers";
import { avatarGroupSx, avatarSx, boxSx, contentSx, nameSx, paperSx } from "./styles";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data }: Props, ref) => {
  const commentBody = (
    <Paper sx={paperSx}>
      <Box sx={boxSx}>
        <Group sx={avatarGroupSx}>
          <Avatar sx={avatarSx} src={data.avatar} alt="user avatar" />
        </Group>
        <Text sx={nameSx} component="h2">
          {data.name}
        </Text>
      </Box>
      <Text sx={contentSx} component="p">
        {data.content}
      </Text>
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
