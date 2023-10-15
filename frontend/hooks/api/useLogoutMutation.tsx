import { setCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth } from "../../contexts/AuthProvider";
import { BOOKMARKS, COMMENT, COMMENTS, NOTIFICATIONS, REPLIES } from "../../query-client/constants";
import { attemptLogout, logoutErrorNotification, logoutSuccessNotification } from "./helpers";

export const USER_DATA_NULL_COOKIE_VALUE = "null";

export const useLogoutMutation = () => {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(attemptLogout, {
    onSuccess: () => {
      setUser(null);
      setCookie(USER_DATA_COOKIE_KEY, USER_DATA_NULL_COOKIE_VALUE);
      logoutSuccessNotification();

      queryClient.removeQueries([REPLIES]);
      queryClient.removeQueries([COMMENT]);
      queryClient.removeQueries([COMMENTS]);
      queryClient.removeQueries([BOOKMARKS]);
      queryClient.removeQueries([NOTIFICATIONS]);
    },
    onError: () => {
      logoutErrorNotification();
    },
  });
};
