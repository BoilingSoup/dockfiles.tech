import { setCookie } from "cookies-next";
import { useQuery } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth } from "../../contexts/AuthProvider";
import { queryKeys } from "../../query-client/constants";
import { getBookmarks, QueryParams } from "./helpers";
import { USER_DATA_NULL_COOKIE_VALUE } from "./useLogoutMutation";

export const useBookmarks = ({ categoryId, cursor, searchParam }: QueryParams) => {
  const {setUser} = useAuth()

  const { data, isLoading, isError, error, isFetching } = useQuery(
    [queryKeys.bookmarks, categoryId, queryKeys.searchStrToKey(searchParam), cursor],
    getBookmarks({ categoryId, cursor, searchParam: searchParam.trim() }),
    {
      keepPreviousData: false,
      onError: () => {
        setUser(null);
        setCookie(USER_DATA_COOKIE_KEY, USER_DATA_NULL_COOKIE_VALUE);
      },
    }
  );

  return { data, isLoading, isError, error, isFetching };
};
