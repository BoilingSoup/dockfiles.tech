import { API_URL } from "../../config/config";
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
    data: Array<{ id: number; name: string; string_id: string }>;
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
  name: string;
  description: string;
  repo_owner: string;
  repo_name: string;
  repo_branch: string;
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

/**Generate a dynamic fetcher function for react-query to use.*/
export function getEnvironments({ categoryId, cursor, searchParam }: QueryParams) {
  console.log(searchParam);
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
  // const endpoint = generateEndpoint({ baseEndpoint, cursor, searchParam });

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

async function getUnfilteredEnvironments({ cursor, searchParam }: { cursor: string; searchParam: string }) {
  const endpoint = `environments?search=${searchParam}&cursor=`; //${cursor}`;
  console.log(endpoint);
  // const endpoint = generateEndpoint({ baseEndpoint, cursor, searchParam });

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

// function generateEndpoint({
//   baseEndpoint,
//   cursor,
//   searchParam,
// }: {
//   baseEndpoint: string;
//   cursor: string;
//   searchParam: string;
// }) {
//   const cursorIsValid = checkCursor(cursor);
//
//   if (cursorIsValid) {
//     return `${baseEndpoint}?cursor=${cursor}&search=${searchParam}`;
//   }
//
//   return `${baseEndpoint}?search=${searchParam}`;
// }
//
// function checkCursor(cursor: string) {
//   return cursor !== INITIAL_PAGE_CURSOR;
// }
