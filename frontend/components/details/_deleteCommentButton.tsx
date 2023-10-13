import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { DARK } from "../../contexts/ColorSchemeProvider";

type Props = {
  onClick: (param: any) => void;
};

export const DeleteCommentButton = ({ onClick: handleDelete }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === DARK;

  return (
    <ActionIcon ml="auto" aria-label="delete comment" onClick={handleDelete} color={isDarkMode ? "" : "dark"}>
      <IconTrash />
    </ActionIcon>
  );
};
