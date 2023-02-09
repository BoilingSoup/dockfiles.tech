import { setCookie } from "cookies-next";
import { useQuery } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../query-client/constants";
import { getEnvironmentsUserStatus } from "./helpers";
import { USER_DATA_NULL_COOKIE_VALUE } from "../../hooks/api/useLogoutMutation";

/** useEnvironmentsUserStatus returns whether the user has liked or bookmarked a particular environment */
export const useEnvironmentsUserStatus = (environmentId: number) => {
  const { user, setUser } = useAuth();

  const { data, isLoading, isError, error, isFetching } = useQuery(
    queryKeys.bookmarkLikeStatus(environmentId),
    getEnvironmentsUserStatus(environmentId),
    {
      keepPreviousData: true,
      onError: () => {
        setUser(null);
        setCookie(USER_DATA_COOKIE_KEY, USER_DATA_NULL_COOKIE_VALUE);
      },
    }
  );

  return { data, isLoading, isError, error, isFetching };
};
