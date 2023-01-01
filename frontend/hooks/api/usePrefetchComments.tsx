import { useQueryClient } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getComments } from "./helpers";

export const usePrefetchComments = (stringId: string) => {
  const queryClient = useQueryClient();

  queryClient.prefetchInfiniteQuery(queryKeys.comments(stringId), getComments(stringId));
};
