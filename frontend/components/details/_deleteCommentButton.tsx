import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";

type Props = {
  onClick: (param: any) => void;
};

export const DeleteCommentButton = ({ onClick: handleDelete }: Props) => {
  return (
    <ActionIcon ml="auto" aria-label="delete comment" onClick={handleDelete}>
      <IconTrash />
    </ActionIcon>
  );
};
