import { Box, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CommentData, RepliesPage } from "../../hooks/api/helpers";
import { useReplies } from "../../hooks/api/useReplies";
import { expandRepliesSx } from "./styles";

type Props = {
  onClick: () => void;
  onLoadingStateChange: Dispatch<SetStateAction<boolean>>;
  onRepliesDataStateChange: Dispatch<SetStateAction<RepliesPage | undefined>>;
  comment: CommentData;
  isToggled: boolean;
  repliesPage: number;
};

export const ShowRepliesButton = ({
  onClick: toggleShowRepliesHandler,
  onLoadingStateChange: setIsLoadingReplies,
  onRepliesDataStateChange: setRepliesData,
  comment,
  isToggled,
  repliesPage,
}: Props) => {
  const [fetchRepliesEnabled, setFetchRepliesEnabled] = useState(false);
  const enableFetchRepliesHandler = () => setFetchRepliesEnabled(true);

  const { data: repliesData, isLoading: isLoadingReplies } = useReplies({
    commentId: comment.id,
    page: repliesPage,
    enabled: fetchRepliesEnabled,
  });

  useEffect(() => {
    setRepliesData(repliesData);
    setIsLoadingReplies(isLoadingReplies);
  }, [repliesData, isLoadingReplies]);

  return (
    <>
      <Box
        onClick={toggleShowRepliesHandler}
        onMouseOver={enableFetchRepliesHandler}
        component="button"
        ml={40}
        sx={expandRepliesSx}
      >
        {isToggled ? <IconChevronUp /> : <IconChevronDown />}
        <Text ml={4}>
          {comment.replies_count > 1 && `${comment.replies_count} replies`}
          {comment.replies_count === 1 && `${comment.replies_count} reply`}
        </Text>
      </Box>
    </>
  );
};
