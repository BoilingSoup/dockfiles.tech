import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

export const DeleteCommentButton = () => {
  return (
    <ActionIcon ml="auto" aria-label="delete comment">
      <IconTrash />
    </ActionIcon>
  );
};
