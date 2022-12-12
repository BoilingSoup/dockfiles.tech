import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { CommentsParam, getComments } from "./helpers";

export const useComments = ({ stringId, cursor }: CommentsParam) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    [queryKeys.comments, stringId, cursor],
    getComments({ stringId, cursor })
  );

  return { data, isLoading, isFetching, isError, error };
};
