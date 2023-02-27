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
    const nextPageExists = data?.data.next_page_url !== null && data?.data.next_page_url !== undefined;
    if (enabled && nextPageExists) {
      queryClient.prefetchQuery(
        queryKeys.replies({ commentId, page: page + 1 }),
        getReplies({ commentId, page: page + 1 })
      );
    }

    const prevPageExists = data?.data.prev_page_url !== null && data?.data.prev_page_url !== undefined;
    if (enabled && prevPageExists) {
      queryClient.prefetchQuery(
        queryKeys.replies({ commentId, page: page - 1 }),
        getReplies({ commentId, page: page - 1 })
      );
    }
  }, [page, data, enabled]);

  return { data, isLoading, isFetching, isFetched, isError, error };
};
