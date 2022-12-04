import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { EnvironmentsData, getEnvironments } from "./helpers";

type PrefetchMetaData = {
  categoryId: string;
  data: EnvironmentsData | undefined;
};

export const usePrefetchEnvironments = ({ categoryId, data }: PrefetchMetaData) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prevCursor = data?.data.prev_cursor;
    const nextCursor = data?.data.next_cursor;

    if (prevCursor) {
      queryClient.prefetchQuery(
        [queryKeys.environments, categoryId, prevCursor],
        getEnvironments({ categoryId, cursor: prevCursor })
      );
    }

    if (nextCursor) {
      queryClient.prefetchQuery(
        [queryKeys.environments, categoryId, nextCursor],
        getEnvironments({ categoryId, cursor: nextCursor })
      );
    }
  }, [queryClient, categoryId, data]);
};
