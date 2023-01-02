import { Box, Button, Group, Paper, Text, useMantineTheme } from "@mantine/core";
import { IconArrowBackUp, IconChevronDown } from "@tabler/icons";
import { forwardRef } from "react";
import { CommentData } from "../../hooks/api/helpers";
import {
  avatarGroupSx,
  avatarStyles,
  boxSx,
  contentSx,
  expandRepliesSx,
  nameSx,
  paperSx,
  repliesBoxSx,
  replyButtonSx,
} from "./styles";

type Props = {
  data: CommentData;
};

type Ref = HTMLElement;

export const Comment = forwardRef<Ref, Props>(({ data }: Props, ref) => {
  const theme = useMantineTheme();

  const commentBody = (
    <>
      <Paper sx={paperSx}>
        <Box sx={boxSx}>
          <Group sx={avatarGroupSx}>
            <img height={40} width={40} style={avatarStyles(theme)} src={data.author.avatar} alt="user avatar" />
          </Group>
          <Text sx={nameSx} component="h2">
            {data.author.name}
          </Text>
          <Text ml="auto" mr={40} size="sm">
            {data.created_at}
          </Text>
        </Box>
        <Text sx={contentSx} component="p">
          {data.content}
        </Text>
        <Box sx={repliesBoxSx}>
          <Box component="button" sx={replyButtonSx}>
            <IconArrowBackUp />
            <Text ml={6}>reply</Text>
          </Box>
          {data.replies_count > 0 && (
            <Box component="button" ml={40} sx={expandRepliesSx}>
              <IconChevronDown />
              <Text ml={4}>
                {data.replies_count > 1 && `${data.replies_count} replies`}
                {data.replies_count === 1 && `${data.replies_count} reply`}
              </Text>
            </Box>
          )}
        </Box>
      </Paper>
    </>
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
