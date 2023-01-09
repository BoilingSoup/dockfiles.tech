import { setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth, User } from "../../contexts/AuthProvider";
import {
  attemptRegister,
  registerErrorNotification,
  RegisterFormValues,
  registerSuccessNotification,
  verificationEmailSentNotification,
} from "./helpers";

export const useRegisterMutation = (modalCloseHandler: () => void) => {
  const { setUser } = useAuth();

  return useMutation((values: RegisterFormValues) => attemptRegister(values), {
    onSuccess: (user: User) => {
      setUser(user);
      setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(user));
      modalCloseHandler();
      registerSuccessNotification();
      verificationEmailSentNotification();
    },
    onError: () => {
      registerErrorNotification();
    },
  });
};
