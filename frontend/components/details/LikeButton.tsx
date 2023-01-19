import { IconThumbUp } from "@tabler/icons";
import { useAuth } from "../../contexts/AuthProvider";
import { LabeledActionButton } from "../common/LabeledActionButton";

export const LikeButton = () => {
  const { user } = useAuth();
  return <LabeledActionButton label="Like" icon={<IconThumbUp />} />;
};
