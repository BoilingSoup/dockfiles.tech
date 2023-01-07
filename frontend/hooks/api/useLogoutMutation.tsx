import { useMutation /*useQueryClient*/ } from "react-query";
import { useAuth } from "../../contexts/AuthProvider";
// import { queryKeys } from "../../query-client/constants";
import { attemptLogout, logoutErrorNotification } from "./helpers";

export const useLogoutMutation = () => {
  const { user, setUser } = useAuth();
  // const queryClient = useQueryClient();

  return useMutation(attemptLogout, {
    onSuccess: () => {
      setUser(null);
      // TODO: invalidate bookmarks, reply notifications, everything related to a specific user
      // queryClient.invalidateQueries(queryKeys)
    },
    onError: () => {
      logoutErrorNotification();
    },
  });
};
