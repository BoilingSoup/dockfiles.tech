import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { apiFetch } from "../../query-client/baseFetcher";
import { queryKeys } from "../../query-client/constants";
import { useStringId } from "../helpers/useStringId";
import { CommentData, CommentsPage, genericErrorNotification } from "./helpers";
import { CommentResponse } from "./types";

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  const stringId = useStringId();

  return useMutation(deleteComment, {
    onSuccess: (_, param) => {
      queryClient.setQueryData<InfiniteData<CommentsPage> | undefined>(queryKeys.comments(stringId), (prev) => {
        if (prev === undefined) return prev;

        const clone: InfiniteData<CommentsPage> = JSON.parse(JSON.stringify(prev));

        clone.pages = clone.pages.map((page) => {
          if (!page.data.some((comment) => comment.id === param.id)) {
            return page;
          }
          page.data = page.data.map((comment) => {
            if (comment.id !== param.id) {
              return comment;
            }

            const copy = JSON.parse(JSON.stringify(comment)) as CommentData;
            copy.content = "This comment was deleted.";
            copy.is_deleted = true;

            return copy;
          });

          return page;
        });
        return clone;
      });

      queryClient.setQueryData<CommentResponse | undefined>(queryKeys.comment(param.id.toString()), (prev) => {
        if (prev === undefined) {
          return prev;
        }

        const clone = JSON.parse(JSON.stringify(prev)) as CommentResponse;
        clone.content = "This comment was deleted.";
        clone.is_deleted = true;

        return clone;
      });
    },
    onError: () => {
      genericErrorNotification();
    },
  });
};

async function deleteComment(comment: CommentData | CommentResponse) {
  return (await apiFetch.delete(`environments/${comment.environment.name}/comments/${comment.id}`)) as void;
}
