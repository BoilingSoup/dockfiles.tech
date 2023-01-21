import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";
import { useBookmarksPageCursor } from "../../zustand-store/bookmarks/useBookmarksPageCursor";
import { useHomeCategoriesSearch } from "../../zustand-store/home/useHomeCategoriesSearch";
import { useHomePageCursor } from "../../zustand-store/home/useHomePageCursor";
import { INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
import {
  AttemptToggleActionMetadata,
  attemptToggleLike,
  EnvironmentUserStatus,
  genericErrorNotification,
  getBookmarks,
  getEnvironments,
} from "./helpers";

export const useLikeMutation = (param: AttemptToggleActionMetadata) => {
  const queryClient = useQueryClient();

  const { setCursor: setHomePageCursor } = useHomePageCursor();
  const { setCursor: setBookmarksPageCursor } = useBookmarksPageCursor();
  const { input: homeSearchParam, select: homeCategoryId } = useHomeCategoriesSearch();
  const { input: bookmarksSearchParam, select: bookmarksCategoryId } = useBookmarksCategoriesSearch();

  return useMutation(() => attemptToggleLike(param), {
    onSuccess: () => {
      // Update bookmarks/likes button state
      queryClient.setQueryData<EnvironmentUserStatus>(queryKeys.bookmarkLikeStatus(param.id), {
        success: true,
        data: {
          // Asserting data is not undefined. If undefined, the mutationFn will return a rejected Promise,
          // and never make it in this onSuccess fallback.
          is_bookmarked: param.data!.data.is_bookmarked,
          is_liked: !param.data!.data.is_liked,
        },
      });

      // Delete bookmarks and environments data from the query cache.
      // Bookmarks/likes button state will be refetched, but will not show a spinner because its options { keepPreviousData: true }
      queryClient.removeQueries(queryKeys.bookmarks);
      queryClient.removeQueries(queryKeys.environments);

      // Reset pagination cursors
      setBookmarksPageCursor(INITIAL_PAGE_CURSOR);
      setHomePageCursor(INITIAL_PAGE_CURSOR);

      // Prefetch Home/Bookmarks index pages
      queryClient.prefetchQuery(
        [queryKeys.bookmarks, bookmarksCategoryId, queryKeys.searchStrToKey(bookmarksSearchParam), INITIAL_PAGE_CURSOR],
        getBookmarks({
          categoryId: bookmarksCategoryId,
          cursor: INITIAL_PAGE_CURSOR,
          searchParam: bookmarksSearchParam,
        })
      );

      queryClient.prefetchQuery(
        [queryKeys.environments, homeCategoryId, queryKeys.searchStrToKey(homeSearchParam), INITIAL_PAGE_CURSOR],
        getEnvironments({ categoryId: homeCategoryId, cursor: INITIAL_PAGE_CURSOR, searchParam: homeSearchParam })
      );
    },
    onError: () => {
      genericErrorNotification();
    },
  });
};
