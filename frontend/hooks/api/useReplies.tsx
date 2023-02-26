import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getReplies } from "./helpers";

type Param = {
  commentId: number;
  page: number;
  enabled: boolean;
};

export const useReplies = ({ commentId, page, enabled }: Param) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isFetched, isError, error } = useQuery(
    queryKeys.replies({ commentId, page }),
    getReplies({ commentId, page }),
    {
      enabled,
    }
  );

  useEffect(() => {
    if (enabled && data?.data.next_page_url !== null) {
      queryClient.prefetchQuery(
        queryKeys.replies({ commentId, page: page + 1 }),
        getReplies({ commentId, page: page + 1 })
      );
    }

    if (enabled && data?.data.prev_page_url !== null) {
      queryClient.prefetchQuery(
        queryKeys.replies({ commentId, page: page - 1 }),
        getReplies({ commentId, page: page - 1 })
      );
    }
  }, [page]);

  return { data, isLoading, isFetching, isFetched, isError, error };
};
