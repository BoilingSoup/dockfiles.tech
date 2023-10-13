import { useQuery } from "react-query";
import { apiFetch } from "../../query-client/baseFetcher";
import { queryKeys } from "../../query-client/constants";
import { CommentResponse } from "./types";

export const useGetComment = (commentId: string) => {
  return useQuery(queryKeys.comment(commentId), getComment(commentId));
};

function getComment(commentId: string) {
  return async function () {
    return (await apiFetch.get(`comment/${commentId}`)) as CommentResponse;
  };
}
