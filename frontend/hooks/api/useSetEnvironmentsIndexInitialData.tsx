import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { EnvironmentsData, getEnvironmentsIndex } from "./helpers";

/**
 * useSetEnvironmentDetailsInitialData populates the query cache with home page data fetched with SSR.
 **/
export const useSetEnvironmentsIndexInitialData = (initialData: EnvironmentsData) => {
  useQuery(queryKeys.initialHomePageQueryKey, getEnvironmentsIndex, {
    initialData,
  });
};
