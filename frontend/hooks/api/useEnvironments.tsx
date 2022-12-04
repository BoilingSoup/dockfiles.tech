import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../../config/config";
import { apiFetch } from "../../query-client/baseFetcher";
import { GET, queryKeys } from "../../query-client/constants";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";

type EnvironmentsData = {
  success: boolean;
  data: {
    data: Array<{ id: number; name: string }>;
    next_cursor: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_cursor: string | null;
    prev_page_url: string | null;
  };
};

type QueryParams = { categoryId: string; cursor: string };

const checkCursor = (cursor: string) => cursor !== INITIAL_PAGE_CURSOR;

const generateEndpoint = ({ baseEndpoint, cursor }: { baseEndpoint: string; cursor: string }) => {
  const cursorIsValid = checkCursor(cursor);

  if (cursorIsValid) {
    return `${baseEndpoint}?cursor=${cursor}`;
  }

  return baseEndpoint;
};

const getFilteredEnvironments = async ({ categoryId, cursor }: QueryParams) => {
  const baseEndpoint = `${API_URL}/categories/${categoryId}/environments`;
  const endpoint = generateEndpoint({ baseEndpoint, cursor });

  return (await apiFetch(endpoint, GET)) as EnvironmentsData;
};

const getUnfilteredEnvironments = async (cursor: string) => {
  const baseEndpoint = `${API_URL}/environments`;
  const endpoint = generateEndpoint({ baseEndpoint, cursor });

  return (await apiFetch(endpoint, GET)) as EnvironmentsData;
};

const getEnvironments =
  ({ categoryId, cursor }: QueryParams) =>
  async () => {
    const isFilteredByCategory = categoryId !== ALL_CATEGORIES;

    if (isFilteredByCategory) {
      return await getFilteredEnvironments({ categoryId, cursor });
    }

    return await getUnfilteredEnvironments(cursor);
  };

export const useEnvironments = ({ categoryId, cursor }: QueryParams) => {
  const { data, isLoading, isError, error } = useQuery(
    [queryKeys.environments, categoryId, cursor],
    getEnvironments({ categoryId, cursor })
  );

  return { data, isLoading, isError, error };
};

type PrefetchMetaData = {
  categoryId: string;
  data: EnvironmentsData | undefined;
};

export const usePrefetchEnvironments = ({ categoryId, data }: PrefetchMetaData) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prevCursor = data?.data.prev_cursor;
    const nextCursor = data?.data.next_cursor;

    if (prevCursor) {
      queryClient.prefetchQuery(
        [queryKeys.environments, categoryId, prevCursor],
        getEnvironments({ categoryId, cursor: prevCursor })
      );
    }

    if (nextCursor) {
      queryClient.prefetchQuery(
        [queryKeys.environments, categoryId, nextCursor],
        getEnvironments({ categoryId, cursor: nextCursor })
      );
    }
  }, [queryClient, categoryId, data]);
};
