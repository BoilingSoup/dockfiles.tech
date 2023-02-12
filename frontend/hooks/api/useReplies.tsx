import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getReplies } from "./helpers";

type Param = {
  commentId: number;
  cursor?: string;
};

export const useReplies = ({ commentId, cursor }: Param) => {
  return useQuery(queryKeys.replies({ commentId, cursor }), getReplies({ commentId, cursor }));
};
