import { Box, Divider, Paper, Text } from "@mantine/core";
import { IconMessage, IconThumbUp } from "@tabler/icons";
import Link from "next/link";
import { iconBoxSx, iconGroupBoxSx, paperSx, textSx } from "./styles";

type Props = {
  name: string;
  string_id: string;
};

export const EnvironmentListItemShell = () => {
  return (
    <>
      <Paper sx={paperSx} />
      <Divider />
    </>
  );
};

export const EnvironmentListItem = ({ name, string_id }: Props) => {
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
                <Text>2</Text>
              </Box>
            </Box>
          </Paper>

          <Divider />
        </a>
      </Link>
    </>
  );
};
