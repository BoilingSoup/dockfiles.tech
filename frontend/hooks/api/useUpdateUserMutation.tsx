import { setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth, User } from "../../contexts/AuthProvider";
import { attemptUserUpdate, UpdateUserPayload } from "./helpers";

export const useUpdateUserMutation = () => {
  const { setUser } = useAuth();

  return useMutation((payload: UpdateUserPayload) => attemptUserUpdate(payload), {
    onSuccess: (user: User) => {
      setUser(user);
      setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(user));
      // modalCloseHandler();
      // registerSuccessNotification();
      // verificationEmailSentNotification();
    },
    onError: () => {
      // registerErrorNotification();
    },
  });
};
