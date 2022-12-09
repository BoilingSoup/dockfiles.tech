import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getEnvironments, QueryParams } from "./helpers";

export const useEnvironments = ({ categoryId, cursor, searchParam }: QueryParams) => {
  const { data, isLoading, isError, error, isFetching } = useQuery(
    [queryKeys.environments, categoryId, queryKeys.searchStrToKey(searchParam), cursor],
    getEnvironments({ categoryId, cursor, searchParam: searchParam.trim() }),
    {
      keepPreviousData: true,
    }
  );

  const [isSkeleton, setIsSkeleton] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && queryClient.getQueryData(queryKeys.initialHomeQueryKey)) {
      setIsSkeleton(false);
    }
  }, [data, queryClient]);

  return { data, isLoading, isSkeleton, isError, error, isFetching };
};
