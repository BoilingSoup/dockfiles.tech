import { setCookie } from "cookies-next";
import { HTTPError } from "ky";
import { useMutation /*useQueryClient*/ } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth } from "../../contexts/AuthProvider";
// import { queryKeys } from "../../query-client/constants";
import { attemptLogout, logoutErrorNotification, logoutSuccessNotification } from "./helpers";

export const USER_DATA_NULL_COOKIE_VALUE = "null";

export const useLogoutMutation = () => {
  const { user, setUser } = useAuth();
  // const queryClient = useQueryClient();

  return useMutation(attemptLogout, {
    onSuccess: () => {
      setUser(null);
      setCookie(USER_DATA_COOKIE_KEY, USER_DATA_NULL_COOKIE_VALUE);
      logoutSuccessNotification();
      // TODO: invalidate bookmarks, reply notifications, everything related to a specific user
      // queryClient.invalidateQueries(queryKeys)
    },
    onError: () => {
      logoutErrorNotification();
    },
  });
};
