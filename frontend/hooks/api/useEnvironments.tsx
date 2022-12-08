import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getEnvironments, QueryParams } from "./helpers";

export const useEnvironments = ({ categoryId, cursor, searchParam }: QueryParams) => {
  const { data, isLoading, isError, error } = useQuery(
    [queryKeys.environments, categoryId, queryKeys.searchStrToKey(searchParam), cursor],
    getEnvironments({ categoryId, cursor, searchParam: searchParam.trim() })
  );

  return { data, isLoading, isError, error };
};
