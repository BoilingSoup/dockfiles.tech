import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { ENVIRONMENTS_INDEX_COOKIE_KEY, USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { useAuth } from "../../contexts/AuthProvider";
import { apiFetch } from "../../query-client/baseFetcher";
import { BOOKMARKS, COMMENT, COMMENTS, NOTIFICATIONS, queryKeys, REPLIES } from "../../query-client/constants";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";
import { deleteAccountSuccessNotification, getEnvironments } from "./helpers";
import { USER_DATA_NULL_COOKIE_VALUE } from "./useLogoutMutation";

export const useDeleteAccountMutation = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const prefetchInitialHomePageAndSetCookie = async () => {
    const homePageData = await getEnvironments({
      categoryId: ALL_CATEGORIES,
      cursor: INITIAL_PAGE_CURSOR,
      searchParam: "",
    })();

    queryClient.setQueryData(queryKeys.initialHomePageQueryKey, homePageData);
    // Need to update the home page data in cookie because it's used for SSR & reruns per page navigation due to getInitialProps

    setCookie(ENVIRONMENTS_INDEX_COOKIE_KEY, JSON.stringify(homePageData));
  };

  return useMutation(deleteAccount, {
    onSettled() {
      prefetchInitialHomePageAndSetCookie();
    },
    onMutate() {
      setUser(null);

      queryClient.removeQueries([REPLIES]);
      queryClient.removeQueries([COMMENT]);
      queryClient.removeQueries([COMMENTS]);
      queryClient.removeQueries([BOOKMARKS]);
      queryClient.removeQueries([NOTIFICATIONS]);

      setCookie(USER_DATA_COOKIE_KEY, USER_DATA_NULL_COOKIE_VALUE);

      router.push("/");

      deleteAccountSuccessNotification();
    },
  });
};

async function deleteAccount() {
  return (await apiFetch.delete("user")) as void;
}
