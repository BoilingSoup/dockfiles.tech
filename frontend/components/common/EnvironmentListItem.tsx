import { Box, Divider, Paper, Text } from "@mantine/core";
import { IconMessage, IconThumbUp } from "@tabler/icons";
import Link from "next/link";
import { iconBoxSx, iconGroupBoxSx, paperSx, textSx } from "./styles";

type Props = {
  name: string;
  string_id: string;
  comments_count: number;
};

export const EnvironmentListItem = ({ name, string_id, comments_count }: Props) => {
  return (
    <>
      <Link href={string_id}>
        <a style={{ textDecoration: "none" }}>
          <Paper sx={paperSx}>
            <Text component="h3" sx={textSx}>
              {name}
            </Text>

            <Box sx={iconGroupBoxSx}>
              <Box sx={iconBoxSx}>
                <IconThumbUp />
                <Text>2</Text>
              </Box>
              <Box sx={iconBoxSx}>
                <IconMessage />
                <Text>{comments_count.toString()}</Text>
              </Box>
            </Box>
          </Paper>

          <Divider />
        </a>
      </Link>
    </>
  );
};
