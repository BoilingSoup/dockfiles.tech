import { setCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { ENVIRONMENTS_INDEX_COOKIE_KEY } from "../../components/layout/constants";
import { queryKeys } from "../../query-client/constants";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";
import { useBookmarksPageCursor } from "../../zustand-store/bookmarks/useBookmarksPageCursor";
import { useHomeCategoriesSearch } from "../../zustand-store/home/useHomeCategoriesSearch";
import { useHomePageCursor } from "../../zustand-store/home/useHomePageCursor";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
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
  const {
    input: homeSearchParam,
    // setInput: setHomeSearchParam,
    select: homeCategoryId,
    // setSelect: setHomeCategoryId,
  } = useHomeCategoriesSearch();
  const { input: bookmarksSearchParam, select: bookmarksCategoryId } = useBookmarksCategoriesSearch();

  return useMutation(() => attemptToggleLike(param), {
    onSuccess: async () => {
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

      // Reset pagination cursors
      setBookmarksPageCursor(INITIAL_PAGE_CURSOR);
      setHomePageCursor(INITIAL_PAGE_CURSOR);
      // setHomeSearchParam("");
      // setHomeCategoryId(ALL_CATEGORIES);

      // Delete bookmarks and environments data from the query cache.
      // Bookmarks/likes button state will be refetched, but will not show a spinner because its options { keepPreviousData: true }
      queryClient.removeQueries(queryKeys.bookmarks);
      queryClient.removeQueries(queryKeys.environments);
      // queryClient.invalidateQueries(queryKeys.environments);

      // Prefetch Bookmarks index page
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
        getEnvironments({
          categoryId: homeCategoryId,
          cursor: INITIAL_PAGE_CURSOR,
          searchParam: homeSearchParam,
        })
      );

      // Prefetch Home page data.
      // Instead of prefetchQuery method, I fetch the data manually so I can also set the result in the cookie.
      // This is necessary because getInitialProps reads from the cookie for home page data.
      const homePageData = await getEnvironments({
        categoryId: ALL_CATEGORIES,
        cursor: INITIAL_PAGE_CURSOR,
        searchParam: "",
      })();

      setCookie(ENVIRONMENTS_INDEX_COOKIE_KEY, JSON.stringify(homePageData));
      queryClient.setQueryData(queryKeys.initialHomePageQueryKey, homePageData);
    },
    onError: () => {
      genericErrorNotification();
    },
  });
};
