import { useQuery } from "react-query";
import { queryKeys } from "../../query-client/constants";
import { getBookmarks, QueryParams } from "./helpers";

export const useBookmarks = ({ categoryId, cursor, searchParam }: QueryParams) => {
  const { data, isLoading, isError, error, isFetching } = useQuery(
    [queryKeys.bookmarks, categoryId, queryKeys.searchStrToKey(searchParam), cursor],
    getBookmarks({ categoryId, cursor, searchParam: searchParam.trim() }),
    {
      keepPreviousData: false,
    }
  );

  return { data, isLoading, isError, error, isFetching };
};
