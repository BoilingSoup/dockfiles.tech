import { setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth, User } from "../../contexts/AuthProvider";
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

  return useMutation((meta: UpdateUserMetadata) => attemptUserUpdate(meta.payload), {
    onSuccess: (user: User, meta) => {
      setUser(user);
      setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(user));

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
