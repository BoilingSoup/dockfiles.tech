import { setCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth, User } from "../../contexts/AuthProvider";
import { COMMENT, COMMENTS, REPLIES } from "../../query-client/constants";
import {
  attemptUserUpdate,
  detectChangedFields,
  UpdateUserMetadata,
  userSettingsUpdateErrorNotification,
  userSettingsUpdateSuccessNotification,
  verificationEmailSentNotification,
} from "./helpers";

export const useUpdateUserMutation = () => {
  const { setUser } = useAuth();

  const queryClient = useQueryClient();

  return useMutation((meta: UpdateUserMetadata) => attemptUserUpdate(meta.payload), {
    onSuccess: (user: User, meta) => {
      setUser(user);
      setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(user));

      queryClient.resetQueries([COMMENTS]);
      queryClient.resetQueries([COMMENT]);
      queryClient.resetQueries([REPLIES]);

      meta.form.resetDirty();
      userSettingsUpdateSuccessNotification();

      const { emailWasChanged } = detectChangedFields(meta);
      if (emailWasChanged) {
        verificationEmailSentNotification();
      }
    },
    onError: () => {
      userSettingsUpdateErrorNotification();
    },
  });
};
