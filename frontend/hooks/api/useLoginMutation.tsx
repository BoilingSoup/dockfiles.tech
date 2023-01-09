import { setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth, User } from "../../contexts/AuthProvider";
import {
  attemptLogin,
  loginErrorNotification,
  LoginFormValues,
  loginSuccessNotification,
  userNotVerifiedNotification,
} from "./helpers";

export const useLoginMutation = (modalCloseHandler: () => void) => {
  const { setUser } = useAuth();

  return useMutation((values: LoginFormValues) => attemptLogin(values), {
    onSuccess: (user: User) => {
      setUser(user);
      setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(user));
      modalCloseHandler();
      loginSuccessNotification();
      if (!user?.email_verified_at) {
        userNotVerifiedNotification();
      }
    },
    onError: () => {
      loginErrorNotification();
    },
  });
};
