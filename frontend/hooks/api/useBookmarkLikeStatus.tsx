import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";

function getBookmarkLikeStatus();

export const useBookmarkLikeStatus = (environmentId: number) => {
  const { data, isLoading, isError, error, isFetching } = useQuery([queryKeys.bookmarkLikeStatus(environmentId)]);
};
