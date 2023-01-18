import { useMutation } from "react-query";
import {
  attemptChangePassword,
  changePasswordErrorNotification,
  ChangePasswordMetadata,
  changePasswordSuccessNotification,
} from "./helpers";

export const useChangePasswordMutation = () => {
  return useMutation((meta: ChangePasswordMetadata) => attemptChangePassword(meta.payload), {
    onSuccess: (_, meta) => {
      meta.form.resetDirty();
      meta.form.reset();
      changePasswordSuccessNotification();
    },
    onError: (_, meta) => {
      meta.form.resetDirty();
      meta.form.reset();
      changePasswordErrorNotification();
    },
  });
};
