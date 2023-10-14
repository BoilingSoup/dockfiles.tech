import { useMutation, useQueryClient } from "react-query";
import { apiFetch } from "../../query-client/baseFetcher";
import { queryKeys } from "../../query-client/constants";
import { genericErrorNotification, RepliesData, RepliesPage } from "./helpers";

export const useDeleteReplyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteReply, {
    onSuccess: (_, param) => {
      queryClient.setQueryData<RepliesPage | undefined>(
        queryKeys.replies({ commentId: param.comment_id, page: param.pageNum }),
        (prev) => {
          if (prev !== undefined) {
            const clone: RepliesPage = JSON.parse(JSON.stringify(prev));

            clone.data.data = clone.data.data.map((el) => {
              if (el.id === param.reply_id) {
                const copy = JSON.parse(JSON.stringify(el)) as RepliesData;
                copy.content = "This comment was deleted.";
                copy.is_deleted = true;
                return copy;
              }
              return el;
            });
            return clone;
          }
        }
      );
    },
    onError: () => {
      genericErrorNotification();
    },
  });
};

type DeleteReplyParam = {
  comment_id: number;
  reply_id: number;
  pageNum: number;
};

async function deleteReply({ comment_id, reply_id }: DeleteReplyParam) {
  return (await apiFetch.delete(`comments/${comment_id}/replies/${reply_id}`)) as void;
}
