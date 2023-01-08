import { showNotification } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { notificationStyles } from "../../components/layout/styles";
import { APP_URL } from "../../config/config";
import { User } from "../../contexts/AuthProvider";
import { apiFetch, authFetch } from "../../query-client/baseFetcher";
import { ALL_CATEGORIES } from "../../zustand-store/types";

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
};

export type EnvironmentDetailsResponse = {
  success: boolean;
  data: EnvironmentDetailsData;
};

/** SSR helper */
export const getEnvironmentByStringId = async (stringId: string) => {
  return (await apiFetch.get(`environments/${stringId}`)) as EnvironmentDetailsResponse;
};

/** SSR helper */
export const getEnvironmentReadMe = async (url: string) => {
  return (await fetch(url)).text();
};

/** SSR helper */
export const getEnvironmentsIndex = async () => {
  return (await apiFetch.get("environments")) as EnvironmentsData;
};

/** SSR helper */
export const getInitialUser = async ({ token, ctx }: { token: string; ctx: GetServerSidePropsContext }) =>
  await fetch(`${APP_URL}/user`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: ctx.req.headers.host || "",
      "X-XSRF-TOKEN": token,
      Cookie: ctx.req.headers.cookie || "",
    },
  });

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
  content: string;
  environment_id: number;
  created_at: string;
  replies_count: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    is_admin: boolean;
  };
};

type CommentsPage = {
  success: boolean;
  data: CommentData[];
  meta: {
    per_page: number;
    next_cursor: string;
  };
};

export function getComments(stringId: string) {
  return function ({ pageParam = "" }) {
    const endpoint = `environments/${stringId}/comments?cursor=${pageParam}`;
    return apiFetch.get(endpoint) as Promise<CommentsPage>;
  };
}

export const getEnvironmentDetails = (stringId: string) => async () => {
  return (await apiFetch.get(`environments/${stringId}`)) as EnvironmentDetailsResponse;
};

/** React Query mutation helpers */
export type LoginFormValues = {
  email: string;
  password: string;
};

export const attemptLogin = async (values: LoginFormValues) =>
  (await authFetch.post("login", { email: values.email, password: values.password })) as User;

export const loginErrorNotification = () =>
  showNotification({
    color: "red",
    title: "Invalid login!",
    message: "Your email and/or password is incorrect.",
    styles: notificationStyles,
  });

export const loginSuccessNotification = () => {
  showNotification({
    color: "lime",
    title: "Logged in!",
    message: "You were successfully logged in.",
    styles: notificationStyles,
  });
};

export const attemptLogout = async (): Promise<Response> => {
  const token = getCookie("XSRF-TOKEN");

  if (typeof token !== "string") {
    throw new Error("Something went wrong.");
  }

  // Using fetch manually because authFetch function parses response .json()
  // logout route returns 204 no content if successful.
  const response = await fetch(`${APP_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(token),
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return response;
};

export const logoutErrorNotification = () => {
  showNotification({
    color: "red",
    title: "Something went wrong!",
    message: "Could not log out at this time. Try again later.",
    styles: notificationStyles,
  });
};

export type RegisterFormValues = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const attemptRegister = async (values: RegisterFormValues) => {
  return (await authFetch.post("register", {
    name: values.displayName,
    email: values.email,
    password: values.password,
    password_confirmation: values.confirmPassword,
  })) as User;
};

export const registerSuccessNotification = () => {
  showNotification({
    color: "lime",
    title: "Registered!",
    message: "Your account was successfully registered.",
    styles: notificationStyles,
  });
};

export const registerErrorNotification = () => {
  showNotification({
    color: "red",
    title: "Error!",
    message: "Something went wrong.",
    styles: notificationStyles,
  });
};

export const verificationEmailSentNotification = () => {
  showNotification({
    color: "blue",
    title: "Verify email",
    message: "A verification link was sent to ___.",
    styles: notificationStyles,
  });
};

export const userNotVerifiedNotification = () => {
  showNotification({
    color: "blue",
    title: "Verify email",
    message: "Your account is not yet verified. Verify your account with the link sent to ___.",
    styles: notificationStyles,
  });
};
