import { IconBookmark, IconCheck } from "@tabler/icons";
import { useBookmarkMutation } from "../../hooks/api/useBookmarkMutation";
import { useEnvironmentsUserStatus } from "../../hooks/api/useEnvironmentsUserStatus";
import { LabeledActionButton } from "../common/LabeledActionButton";

type Props = {
  id: number;
};

export const BookmarkButton = ({ id }: Props) => {
  const { data, isLoading } = useEnvironmentsUserStatus(id);
  const isBookmarked = data?.data.is_bookmarked;

  const { mutate: bookmarkMutation, isLoading: isMutating } = useBookmarkMutation({ data, id });

  return (
    <LabeledActionButton
      mr="md"
      isLoading={isLoading || isMutating}
      label={isBookmarked ? "Bookmarked" : "Bookmark"}
      icon={isBookmarked ? <IconCheck /> : <IconBookmark />}
      onClick={() => bookmarkMutation()}
    />
  );
};
