import { useMutation } from "react-query";
import { useAuth, User } from "../../contexts/AuthProvider";
import { attemptLogin, loginErrorNotification, LoginFormValues } from "./helpers";

export const useRegisterMutation = () => {
  const { setUser } = useAuth();

  // TODO: change attemptLogin to attemptRegister function. need to create attemptRegister
  return useMutation((values: LoginFormValues) => attemptLogin(values), {
    onSuccess: (user: User) => {
      setUser(user);
    },
    onError: () => {
      loginErrorNotification();
    },
  });
};
