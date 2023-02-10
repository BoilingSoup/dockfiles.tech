import { useQuery } from "react-query";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../query-client/constants";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
import { getBookmarks } from "./helpers";

export const usePrefetchBookmarksInitialPage = () => {
  const { user } = useAuth();

  if (!user) {
    return;
  }

  return useQuery(
    [queryKeys.bookmarks, ALL_CATEGORIES, "", INITIAL_PAGE_CURSOR],
    getBookmarks({ categoryId: ALL_CATEGORIES, cursor: INITIAL_PAGE_CURSOR, searchParam: "" })
  );
};
