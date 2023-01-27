import { useMutation } from "react-query";
import { attemptPostComment, AttemptPostCommentMetadata } from "./helpers";

export const usePostCommmentMutation = () => {
  return useMutation((param: AttemptPostCommentMetadata) => attemptPostComment(param), {
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
    },
  });
};
