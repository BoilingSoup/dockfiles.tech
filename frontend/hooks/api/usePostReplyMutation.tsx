import { setCookie } from "cookies-next";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { initialCharCountText } from "../../components/details/CommentTextArea";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { DEFAULT_AVATAR } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../query-client/constants";
import {
  attemptPostComment,
  AttemptPostCommentMetadata,
  attemptPostReply,
  AttemptPostReplyMetadata,
  CommentsPage,
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
      // queryClient.setQueryData<InfiniteData<CommentsPage> | undefined>(queryKeys.comments(param.stringId), (prev) => {
      //   const clone: InfiniteData<CommentsPage> = JSON.parse(JSON.stringify(prev));
      //   const created_at = new Date().toISOString().split("T")[0];
      //   const avatar = user!.avatar ?? DEFAULT_AVATAR;

      //   clone.pages[0].data.unshift({
      //     author: {
      //       avatar: avatar,
      //       id: user!.id,
      //       is_admin: user!.is_admin,
      //       name: user!.name,
      //     }, // user must be authenticated if posting comment was successful
      //     content: param.body.content,
      //     id: Math.floor(Math.random() * -100000), // random placeholder ID until refetch is complete
      //     created_at: created_at,
      //     environment_id: 10,
      //     replies_count: 0,
      //   });

      //   return clone;
      // });

      resetFormState(param);
    },
    onError: () => {
      setUser(null);
      setCookie(USER_DATA_COOKIE_KEY, USER_DATA_NULL_COOKIE_VALUE);
    },
  });
};
