import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { EnvironmentDetailsData, getEnvironmentDetails } from "./helpers";

type EnvironmentInfo = {
  stringId: string;
  environment: EnvironmentDetailsData;
};

/**
 * useSetEnvironmentDetailsInitialData populates the query cache with data fetched during SSR to avoid redundant data fetching
 **/
export const useSetEnvironmentDetailsInitialData = ({ stringId, environment }: EnvironmentInfo) => {
  useQuery(queryKeys.environmentDetails(stringId), getEnvironmentDetails(stringId), {
    initialData: {
      success: true,
      data: {
        id: environment.id,
        name: environment.name,
        string_id: environment.string_id,
        description: environment.description,
        repo_name: environment.repo_name,
        repo_owner: environment.repo_owner,
        repo_branch: environment.repo_branch,
      },
    },
  });
};
