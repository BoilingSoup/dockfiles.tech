import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { useBookmarksPageCursor } from "../../zustand-store/bookmarks/useBookmarksPageCursor";
import { INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
import {
  attemptToggleBookmark,
  AttemptBookmarkMetadata,
  genericErrorNotification,
  EnvironmentUserStatus,
} from "./helpers";

export const useBookmarkMutation = (param: AttemptBookmarkMetadata) => {
  const queryClient = useQueryClient();
  const { setCursor } = useBookmarksPageCursor();

  return useMutation(() => attemptToggleBookmark(param), {
    onSuccess: () => {
      queryClient.setQueryData<EnvironmentUserStatus>(queryKeys.bookmarkLikeStatus(param.id), {
        success: true,
        data: {
          is_bookmarked: !param!.data!.data.is_bookmarked,
          is_liked: param!.data!.data.is_liked,
        },
      });
      queryClient.removeQueries(queryKeys.bookmarks);
      setCursor(INITIAL_PAGE_CURSOR);
    },
    onError: () => {
      genericErrorNotification();
    },
  });
};
