import { useMutation } from "react-query";
import { useAuth, User } from "../../contexts/AuthProvider";
import { attemptLogin, loginErrorNotification, LoginFormValues } from "./helpers";

export const useLoginMutation = () => {
  const { setUser } = useAuth();

  return useMutation((values: LoginFormValues) => attemptLogin(values), {
    onSuccess: (user: User) => {
      setUser(user);
    },
    onError: () => {
      loginErrorNotification();
    },
  });
};
