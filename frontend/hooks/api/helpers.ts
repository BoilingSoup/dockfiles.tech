import { apiFetch } from "../../query-client/baseFetcher";
import { ALL_CATEGORIES, INITIAL_PAGE_CURSOR } from "../../zustand-store/types";

export type QueryParams = {
  categoryId: string;
  cursor: string;
  searchParam: string;
};

export type EnvironmentsData = {
  success: boolean;
  data: {
    data: Array<{ id: number; name: string; string_id: string; comments_count: number }>;
    next_cursor: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_cursor: string | null;
    prev_page_url: string | null;
  };
};

export type EnvironmentPath = {
  params: {
    string_id: string;
  };
};

export type EnvironmentDetailsData = {
  id: number;
  string_id: string;
  name: string;
  description: string;
  repo_owner: string;
  repo_name: string;
  repo_branch: string;
  comments_count: number;
};

export type EnvironmentDetailsResponse = {
  success: boolean;
  data: EnvironmentDetailsData;
};

/**Used for getting paths of SSG Environment details pages*/
export const getAllEnvironmentPaths = async () => {
  const paths: EnvironmentPath[] = [];

  const recursiveGetEnvironmentPath = async (cursor: string | null = INITIAL_PAGE_CURSOR) => {
    if (!cursor) return;

    const res = await getEnvironments({ categoryId: ALL_CATEGORIES, cursor, searchParam: "" })();
    const next = res.data.next_cursor;
    res.data.data.forEach((environment) => paths.push({ params: { string_id: environment.string_id } }));

    await recursiveGetEnvironmentPath(next);
  };

  await recursiveGetEnvironmentPath();
  return paths;
};

/**Used for getting Environment details for SSG pages*/
export const getEnvironmentByStringId = async (stringId: string) => {
  return (await apiFetch.get(`environments/${stringId}`)) as EnvironmentDetailsResponse;
};

export const getEnvironmentReadMe = async (url: string) => {
  return (await fetch(url)).text();
};

/**React Query fetcher functions*/
export function getEnvironments({ categoryId, cursor, searchParam }: QueryParams) {
  return async function () {
    const isFilteredByCategory = categoryId !== ALL_CATEGORIES;

    if (isFilteredByCategory) {
      return await getFilteredEnvironments({ categoryId, cursor, searchParam });
    }

    return await getUnfilteredEnvironments({ cursor, searchParam });
  };
}

async function getFilteredEnvironments({ categoryId, cursor, searchParam }: QueryParams) {
  const endpoint = `categories/${categoryId}/environments?cursor=${cursor}&search=${searchParam}`;

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

async function getUnfilteredEnvironments({ cursor, searchParam }: { cursor: string; searchParam: string }) {
  const endpoint = `environments?cursor=${cursor}&search=${searchParam}`;

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

export type CommentData = {
  id: number;
  name: string;
  avatar: string;
  content: string;
  created_at: string;
};

type CommentsPage = {
  success: boolean;
  data: {
    data: {
      data: CommentData[];
      path: string;
      per_page: number;
      next_cursor: string | null;
      next_page_url: string | null;
      prev_cursor: string | null;
      prev_page_url: string | null;
      comments_count: number;
    };
  };
};

export function getComments(stringId: string) {
  return function ({ pageParam = "" }) {
    const endpoint = `environments/${stringId}/comments?cursor=${pageParam}`;
    return apiFetch.get(endpoint) as Promise<CommentsPage>;
  };
}
