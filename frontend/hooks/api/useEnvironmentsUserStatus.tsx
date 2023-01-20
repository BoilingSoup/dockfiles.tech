import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getEnvironmentsUserStatus } from "./helpers";

/** useEnvironmentsUserStatus returns whether the user has liked or bookmarked a particular environment */
export const useEnvironmentsUserStatus = (environmentId: number) => {
  const { data, isLoading, isError, error, isFetching } = useQuery(
    queryKeys.bookmarkLikeStatus(environmentId),
    getEnvironmentsUserStatus(environmentId),
    {
      keepPreviousData: true
    }
  );

  return { data, isLoading, isError, error, isFetching };
};
