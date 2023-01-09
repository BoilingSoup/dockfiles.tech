import { deleteCookie } from "cookies-next";
import { useMutation /*useQueryClient*/ } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth } from "../../contexts/AuthProvider";
// import { queryKeys } from "../../query-client/constants";
import { attemptLogout, logoutErrorNotification } from "./helpers";

export const useLogoutMutation = () => {
  const { user, setUser } = useAuth();
  // const queryClient = useQueryClient();

  return useMutation(attemptLogout, {
    onSuccess: () => {
      setUser(null);
      deleteCookie(USER_DATA_COOKIE_KEY);
      // TODO: invalidate bookmarks, reply notifications, everything related to a specific user
      // queryClient.invalidateQueries(queryKeys)
    },
    onError: () => {
      logoutErrorNotification();
    },
  });
};
