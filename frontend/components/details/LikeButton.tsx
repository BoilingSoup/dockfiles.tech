import { IconCheck, IconThumbUp } from "@tabler/icons";
import { useEnvironmentsUserStatus } from "../../hooks/api/useEnvironmentsUserStatus";
import { LabeledActionButton } from "../common/LabeledActionButton";

type Props = {
  id: number;
};

export const LikeButton = ({ id }: Props) => {
  const { data, isLoading } = useEnvironmentsUserStatus(id);
  console.log(data)
  const isLiked = data?.data.is_liked;

  return <LabeledActionButton onClick={() => {}} label="Like" isLoading={isLoading} icon={isLiked ? <IconCheck /> : <IconThumbUp />} />;
};
