import { IconThumbUp } from "@tabler/icons";
import { useEnvironmentsUserStatus } from "../../hooks/api/useEnvironmentsUserStatus";
import { LabeledActionButton } from "../common/LabeledActionButton";

type Props = {
  id: number;
};

export const LikeButton = ({ id }: Props) => {
  const { data } = useEnvironmentsUserStatus(id);

  return <LabeledActionButton label="Like" icon={<IconThumbUp />} />;
};
