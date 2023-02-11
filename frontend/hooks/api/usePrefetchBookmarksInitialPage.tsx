import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../query-client/constants";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
import { getBookmarks } from "./helpers";

export const usePrefetchBookmarksInitialPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user !== null) {
      queryClient.prefetchQuery(
        [queryKeys.bookmarks, ALL_CATEGORIES, "", INITIAL_PAGE_CURSOR],
        getBookmarks({ categoryId: ALL_CATEGORIES, cursor: INITIAL_PAGE_CURSOR, searchParam: "" })
      );
    }
  }, [user, queryClient]);
};
