import { setCookie } from "cookies-next";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { ENVIRONMENTS_INDEX_COOKIE_KEY } from "../../components/layout/constants";
import { DEFAULT_AVATAR } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../query-client/constants";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";
import { useBookmarksPageCursor } from "../../zustand-store/bookmarks/useBookmarksPageCursor";
import { useHomeCategoriesSearch } from "../../zustand-store/home/useHomeCategoriesSearch";
import { useHomePageCursor } from "../../zustand-store/home/useHomePageCursor";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
import { attemptPostComment, AttemptPostCommentMetadata, CommentsPage, getBookmarks, getEnvironments } from "./helpers";
import { CommentsCountResponse } from "./useCommentsCount";

export const usePostCommmentMutation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { setCursor: setHomePageCursor } = useHomePageCursor();
  const { setCursor: setBookmarksPageCursor } = useBookmarksPageCursor();
  const { input: homeSearchParam, select: homeCategoryId } = useHomeCategoriesSearch();
  const { input: bookmarksSearchParam, select: bookmarksCategoryId } = useBookmarksCategoriesSearch();

  const resetPageCursors = () => {
    setBookmarksPageCursor(INITIAL_PAGE_CURSOR);
    setHomePageCursor(INITIAL_PAGE_CURSOR);
  };

  const invalidateStaleCacheData = (stringId: string) => {
    queryClient.invalidateQueries(queryKeys.bookmarks);
    queryClient.invalidateQueries(queryKeys.environments);
    queryClient.invalidateQueries(queryKeys.comments(stringId));
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

  return useMutation((param: AttemptPostCommentMetadata) => attemptPostComment(param), {
    onSuccess: (_, param) => {
      queryClient.setQueryData<InfiniteData<CommentsPage> | undefined>(queryKeys.comments(param.stringId), (prev) => {
        const clone: InfiniteData<CommentsPage> = JSON.parse(JSON.stringify(prev));
        const created_at = new Date().toISOString().split("T")[0];
        const avatar = user!.avatar ?? DEFAULT_AVATAR;

        clone.pages[0].data.unshift({
          author: {
            avatar: avatar,
            id: user!.id,
            is_admin: user!.is_admin,
            name: user!.name,
          }, // user must be authenticated if posting comment was successful
          content: param.body.content,
          id: Math.floor(Math.random() * -100000), // random placeholder ID until refetch is complete
          created_at: created_at,
          environment_id: 10,
          replies_count: 0,
        });

        return clone;
      });

      queryClient.setQueryData<CommentsCountResponse>(queryKeys.commentsCount(param.stringId), (prev) => {
        const clone: CommentsCountResponse = JSON.parse(JSON.stringify(prev));
        clone.data.comments_count += 1;
        return clone;
      });

      resetPageCursors();
      invalidateStaleCacheData(param.stringId);
      prefetchData();
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
    },
  });
};
