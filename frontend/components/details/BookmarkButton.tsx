import { IconBookmark, IconCheck } from "@tabler/icons";
import { useEnvironmentsUserStatus } from "../../hooks/api/useEnvironmentsUserStatus";
import { LabeledActionButton } from "../common/LabeledActionButton";

type Props = {
  id: number;
};

export const BookmarkButton = ({ id }: Props) => {
  const { data, isLoading } = useEnvironmentsUserStatus(id);
  const isBookmarked = data?.data.is_bookmarked;

  return (
    <LabeledActionButton
      mr="md"
      isLoading={isLoading}
      label={isBookmarked ? "Bookmarked" : "Bookmark"}
      icon={isBookmarked ? <IconCheck /> : <IconBookmark />}
    />
  );
};
