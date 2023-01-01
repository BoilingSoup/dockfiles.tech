import { Box, Group, Paper, Text, useMantineTheme } from "@mantine/core";
import { forwardRef } from "react";
import { CommentData } from "../../hooks/api/helpers";
import { avatarGroupSx, avatarStyles, boxSx, contentSx, nameSx, paperSx } from "./styles";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data }: Props, ref) => {
  const theme = useMantineTheme();

  const commentBody = (
    <Paper sx={paperSx}>
      <Box sx={boxSx}>
        <Group sx={avatarGroupSx}>
          <img height={40} width={40} style={avatarStyles(theme)} src={data.author.avatar} alt="user avatar" />
        </Group>
        <Text sx={nameSx} component="h2">
          {data.author.name}
        </Text>
        <Text>{data.created_at}</Text>
      </Box>
      <Text sx={contentSx} component="p">
        {data.content}
      </Text>
      <Text>{data.replies_count} replies</Text>
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
