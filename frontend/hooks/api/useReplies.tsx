import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getReplies } from "./helpers";

type Param = {
  commentId: number;
  cursor?: string;
  fetchReplies: boolean;
};

export const useReplies = ({ commentId, cursor, fetchReplies }: Param) => {
  return useQuery(queryKeys.replies({ commentId, cursor }), getReplies({ commentId, cursor }), {
    enabled: fetchReplies,
  });
};
