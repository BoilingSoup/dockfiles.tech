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
  const { input: homeSearchParam, select: homeCategoryId } = useHomeCategoriesSearch();
  const { input: bookmarksSearchParam, select: bookmarksCategoryId } = useBookmarksCategoriesSearch();

  const resetPageCursors = () => {
    setBookmarksPageCursor(INITIAL_PAGE_CURSOR);
    setHomePageCursor(INITIAL_PAGE_CURSOR);
  };

  const removeStaleCacheData = () => {
    queryClient.removeQueries(queryKeys.bookmarks);
    queryClient.removeQueries(queryKeys.environments);
  };

  const prefetchData = () => {
    prefetchBookmarksPage();
    prefetchEnvironmentsPage();
    prefetchInitialHomePageAndSetCookie();
  };

  const prefetchBookmarksPage = () => {
    queryClient.prefetchQuery(
      [queryKeys.bookmarks, bookmarksCategoryId, queryKeys.searchStrToKey(bookmarksSearchParam), INITIAL_PAGE_CURSOR],
      getBookmarks({
        categoryId: bookmarksCategoryId,
        cursor: INITIAL_PAGE_CURSOR,
        searchParam: bookmarksSearchParam,
      })
    );
  };

  const prefetchEnvironmentsPage = () => {
    queryClient.prefetchQuery(
      [queryKeys.environments, homeCategoryId, queryKeys.searchStrToKey(homeSearchParam), INITIAL_PAGE_CURSOR],
      getEnvironments({
        categoryId: homeCategoryId,
        cursor: INITIAL_PAGE_CURSOR,
        searchParam: homeSearchParam,
      })
    );
  };

  const prefetchInitialHomePageAndSetCookie = async () => {
    const homePageData = await getEnvironments({
      categoryId: ALL_CATEGORIES,
      cursor: INITIAL_PAGE_CURSOR,
      searchParam: "",
    })();
    queryClient.setQueryData(queryKeys.initialHomePageQueryKey, homePageData);
    // Need to update the home page data in cookie because it's used for SSR & reruns per page navigation due to getInitialProps
    setCookie(ENVIRONMENTS_INDEX_COOKIE_KEY, JSON.stringify(homePageData));
  };

  return useMutation(() => attemptToggleLike(param), {
    onSuccess: () => {
      queryClient.setQueryData<EnvironmentUserStatus>(queryKeys.bookmarkLikeStatus(param.id), {
        success: true,
        data: {
          // Asserting data is not undefined. If undefined, the mutationFn will return a rejected Promise,
          // and never make it in this onSuccess fallback.
          is_bookmarked: param.data!.data.is_bookmarked,
          is_liked: !param.data!.data.is_liked,
        },
      });

      resetPageCursors();
      removeStaleCacheData();
      prefetchData();
    },
    onError: () => {
      genericErrorNotification();
    },
  });
};
