import { useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { EnvironmentsData } from "./helpers";

/**
 * useSetEnvironmentDetailsInitialData populates the query cache with home page data fetched with SSR.
 **/
export const useSetEnvironmentsIndexInitialData = (initialData: EnvironmentsData) => {
  const queryClient = useQueryClient();

  queryClient.setQueryData(queryKeys.initialHomePageQueryKey, initialData);
};
