import { IconBookmark } from "@tabler/icons";
import { useAuth } from "../../contexts/AuthProvider";
import { LabeledActionButton } from "../common/LabeledActionButton";

export const BookmarkButton = () => {
  const { user } = useAuth();
  return <LabeledActionButton mr="md" label="Bookmark" icon={<IconBookmark />} />;
};
