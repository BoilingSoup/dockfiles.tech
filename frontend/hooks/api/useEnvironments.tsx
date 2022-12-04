import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getEnvironments, QueryParams } from "./helpers";

export const useEnvironments = ({ categoryId, cursor }: QueryParams) => {
  const { data, isLoading, isError, error } = useQuery(
    [queryKeys.environments, categoryId, cursor],
    getEnvironments({ categoryId, cursor })
  );

  return { data, isLoading, isError, error };
};
