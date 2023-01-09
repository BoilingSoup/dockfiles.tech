import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { EnvironmentsData, getBookmarks } from "./helpers";

type PrefetchMetaData = {
  categoryId: string;
  data: EnvironmentsData | undefined;
  searchParam: string;
};

export const usePrefetchBookmarks = ({ categoryId, data, searchParam }: PrefetchMetaData) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prevCursor = data?.data.prev_cursor;
    const nextCursor = data?.data.next_cursor;

    if (prevCursor) {
      queryClient.prefetchQuery(
        [queryKeys.bookmarks, categoryId, queryKeys.searchStrToKey(searchParam), prevCursor],
        getBookmarks({ categoryId, cursor: prevCursor, searchParam })
      );
    }

    if (nextCursor) {
      queryClient.prefetchQuery(
        [queryKeys.bookmarks, categoryId, queryKeys.searchStrToKey(searchParam), nextCursor],
        getBookmarks({ categoryId, cursor: nextCursor, searchParam })
      );
    }
  }, [queryClient, categoryId, data, searchParam]);
};
