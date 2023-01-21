import { IconCheck, IconThumbUp } from "@tabler/icons";
import { useEnvironmentsUserStatus } from "../../hooks/api/useEnvironmentsUserStatus";
import { useLikeMutation } from "../../hooks/api/useLikeMutation";
import { LabeledActionButton } from "../common/LabeledActionButton";

type Props = {
  id: number;
};

export const LikeButton = ({ id }: Props) => {
  const { data, isLoading } = useEnvironmentsUserStatus(id);
  const isLiked = data?.data.is_liked;

  const { mutate: likeMutation, isLoading: isMutating } = useLikeMutation({ data, id });

  return (
    <LabeledActionButton
      isLoading={isLoading || isMutating}
      label={isLiked ? "Liked" : "Like"}
      icon={isLiked ? <IconCheck /> : <IconThumbUp />}
      onClick={() => likeMutation()}
    />
  );
};
