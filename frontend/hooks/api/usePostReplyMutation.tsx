import { setCookie } from "cookies-next";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { initialCharCountText } from "../../components/details/CommentTextArea";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { DEFAULT_AVATAR } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../query-client/constants";
import {
  AttemptPostCommentMetadata,
  attemptPostReply,
  AttemptPostReplyMetadata,
  CommentsPage,
  postReplySuccessNotification,
  RepliesPage,
} from "./helpers";
import { USER_DATA_NULL_COOKIE_VALUE } from "./useLogoutMutation";

export const usePostReplyMutation = () => {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();

  const resetFormState = ({ charCountTextRef, textAreaRef, setButtonIsEnabled }: AttemptPostCommentMetadata) => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.value = "";
    }
    if (charCountTextRef.current !== null) {
      charCountTextRef.current.innerText = initialCharCountText;
    }
    setButtonIsEnabled(false);
  };

  return useMutation((param: AttemptPostReplyMetadata) => attemptPostReply(param), {
    onSuccess: (_, param) => {
      queryClient.setQueryData<RepliesPage | undefined>(
        queryKeys.replies({ commentId: param.comment.id, page: 1 }),
        (prev) => {
          const created_at = new Date().toISOString().split("T")[0];
          const avatar = user!.avatar ?? DEFAULT_AVATAR;

          if (prev !== undefined) {
            const clone: RepliesPage = JSON.parse(JSON.stringify(prev));

            clone.data.data.unshift({
              author: {
                avatar: avatar,
                id: user!.id,
                is_admin: user!.is_admin,
                name: user!.name,
              }, // user must be authenticated if posting comment was successful
              content: param.body.content,
              id: Math.floor(Math.random() * -100000), // random placeholder ID until refetch is complete
              created_at: created_at,
              comment_id: param.comment.id,
              is_read: false,
              recipient_id: param.body.recipient_id ? +param.body.recipient_id : param.comment.id,
            });

            return clone;
          }

          const queryData: RepliesPage = {
            success: true,
            data: {
              data: [
                {
                  id: 1,
                  content: param.body.content,
                  is_read: false,
                  recipient_id: param.body.recipient_id ? +param.body.recipient_id : param.comment.id,
                  comment_id: param.comment.id,
                  created_at,
                  author: {
                    avatar,
                    id: user!.id,
                    is_admin: user!.is_admin,
                    name: user!.name,
                  },
                },
              ],
              current_page: 1,
              first_page_url: "placeholder",
              from: 1111,
              last_page: 1,
              last_page_url: "placeholder",
              links: [],
              next_page_url: null,
              path: "placholder",
              per_page: 3,
              prev_page_url: null,
              to: 1111,
              total: 1,
            },
          };
          if (param.showRepliesHandler !== undefined) param.showRepliesHandler(queryData);

          return queryData;
        }
      );

      queryClient.setQueryData<InfiniteData<CommentsPage> | undefined>(queryKeys.comments(param.stringId), (prev) => {
        const clone: InfiniteData<CommentsPage> = JSON.parse(JSON.stringify(prev));

        let commentWasFound = false;
        // could be faster but good for now
        for (let page of clone.pages) {
          for (let comment of page.data) {
            if (comment.id === param.comment.id) {
              commentWasFound = true;
              comment.replies_count += 1;
              break;
            }
          }
          if (commentWasFound) {
            break;
          }
        }

        return clone;
      });

      resetFormState(param);
      param.hideTextAreaHandler();
      postReplySuccessNotification();
    },
    onError: () => {
      setUser(null);
      setCookie(USER_DATA_COOKIE_KEY, USER_DATA_NULL_COOKIE_VALUE);
    },
  });
};
