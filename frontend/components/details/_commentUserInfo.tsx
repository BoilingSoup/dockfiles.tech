import { Box, Group, useMantineTheme, Text } from "@mantine/core";
import { DEFAULT_AVATAR } from "../../config/config";
import { avatarGroupSx, avatarStyles, boxSx, nameSx } from "./styles";

type Props = {
  avatar?: string | null;
  alt?: string;
  author: string;
  created_at?: string;
};

export const CommentUserInfo = ({ avatar, alt = "user avatar", author, created_at }: Props) => {
  const theme = useMantineTheme();

  return (
    <Box sx={boxSx}>
      <Group sx={avatarGroupSx}>
        {/*eslint-disable-next-line*/}
        <img height={40} width={40} style={avatarStyles(theme)} src={avatar || DEFAULT_AVATAR} alt={alt} />
      </Group>
      <Text sx={nameSx} component="h2">
        {author}
      </Text>
      {created_at && (
        <Text ml="auto" mr={40} size="sm">
          {created_at}
        </Text>
      )}
    </Box>
  );
};
