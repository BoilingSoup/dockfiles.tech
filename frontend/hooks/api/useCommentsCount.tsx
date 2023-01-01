import { useQuery } from "react-query";
import { apiFetch } from "../../query-client/baseFetcher";
import { queryKeys } from "../../query-client/constants";

type CommentsCountResponse = {
  success: boolean;
  data: {
    comments_count: number;
  };
};

const getCommentsCount = (stringId: string) => async () => {
  return (await apiFetch.get(`environments/${stringId}/comments/count`)) as CommentsCountResponse;
};

export const useCommentsCount = (stringId: string) => {
  const { data, isLoading, isError, error } = useQuery(queryKeys.commentsCount(stringId), getCommentsCount(stringId));

  return { count: data?.data.comments_count, isLoading, isError, error };
};
