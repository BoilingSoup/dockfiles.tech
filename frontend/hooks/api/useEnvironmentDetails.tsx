import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getEnvironmentDetails } from "./helpers";

export const useEnvironmentDetails = (stringId: string) => {
  const { data, isLoading, isError, error } = useQuery(
    queryKeys.environmentDetails(stringId),
    getEnvironmentDetails(stringId)
  );

  return { data: data?.data, isLoading, isError, error };
};
