import { IconBookmark } from "@tabler/icons";
import { useEnvironmentsUserStatus } from "../../hooks/api/useEnvironmentsUserStatus";
import { LabeledActionButton } from "../common/LabeledActionButton";

type Props = {
  id: number;
};

export const BookmarkButton = ({ id }: Props) => {
  const { data } = useEnvironmentsUserStatus(id);

  return <LabeledActionButton mr="md" label="Bookmark" icon={<IconBookmark />} />;
};
