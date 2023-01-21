import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";
import { useBookmarksPageCursor } from "../../zustand-store/bookmarks/useBookmarksPageCursor";
import { INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
import {
  attemptToggleBookmark,
  AttemptBookmarkMetadata,
  genericErrorNotification,
  EnvironmentUserStatus,
  getBookmarks,
} from "./helpers";

export const useBookmarkMutation = (param: AttemptBookmarkMetadata) => {
  const queryClient = useQueryClient();

  const { setCursor } = useBookmarksPageCursor();
  const { input: searchParam, select: categoryId } = useBookmarksCategoriesSearch();

  return useMutation(() => attemptToggleBookmark(param), {
    onSuccess: () => {
      // Update bookmarks/likes button state
      queryClient.setQueryData<EnvironmentUserStatus>(queryKeys.bookmarkLikeStatus(param.id), {
        success: true,
        data: {
          is_bookmarked: !param!.data!.data.is_bookmarked,
          is_liked: param!.data!.data.is_liked,
        },
      });

      // Delete bookmarks data from the query cache. This prevents the user from seeing a stale bookmark
      // on the bookmarks index page.
      // 
      // Bookmarks/likes button state will be refetched, but will not show a spinner because its options { keepPreviousData: true }
      queryClient.removeQueries(queryKeys.bookmarks);

      // Reset bookmarks index page pagination
      setCursor(INITIAL_PAGE_CURSOR);

      // Prefetch bookmarks index page
      queryClient.prefetchQuery(
        [queryKeys.bookmarks, categoryId, queryKeys.searchStrToKey(searchParam), INITIAL_PAGE_CURSOR],
        getBookmarks({ categoryId, cursor: INITIAL_PAGE_CURSOR, searchParam })
      );

      // NOTE: if user navigates to bookmarks index page before the prefetch is complete, the user sees a loading spinner due to queryClient.removeQueries()
    },
    onError: () => {
      genericErrorNotification();
    },
  });
};
