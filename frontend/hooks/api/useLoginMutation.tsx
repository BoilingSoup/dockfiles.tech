import { useMutation } from "react-query";
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
