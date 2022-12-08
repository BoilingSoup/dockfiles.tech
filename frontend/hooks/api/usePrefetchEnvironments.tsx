import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { EnvironmentsData, getEnvironments } from "./helpers";

type PrefetchMetaData = {
  categoryId: string;
  data: EnvironmentsData | undefined;
  searchParam: string;
};

export const usePrefetchEnvironments = ({ categoryId, data, searchParam }: PrefetchMetaData) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prevCursor = data?.data.prev_cursor;
    const nextCursor = data?.data.next_cursor;

    if (prevCursor) {
      queryClient.prefetchQuery(
        [queryKeys.environments, categoryId, queryKeys.searchStrToKey(searchParam), prevCursor],
        getEnvironments({ categoryId, cursor: prevCursor, searchParam })
      );
    }

    if (nextCursor) {
      queryClient.prefetchQuery(
        [queryKeys.environments, categoryId, queryKeys.searchStrToKey(searchParam), nextCursor],
        getEnvironments({ categoryId, cursor: nextCursor, searchParam })
      );
    }
  }, [queryClient, categoryId, data, searchParam]);
};
