import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { Dispatch, RefObject, SetStateAction } from "react";
import { notificationStyles } from "../../components/layout/styles";
import { ChangePasswordFormValues } from "../../components/settings/hooks/useChangePasswordForm";
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
    data: Array<{ id: number; name: string; string_id: string; comments_count: number; likes_count: number }>;
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

export type EnvironmentUserStatus = {
  success: boolean;
  data: {
    is_bookmarked: boolean;
    is_liked: boolean;
  };
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

export function getEnvironmentsUserStatus(environmentId: number) {
  return async function () {
    const endpoint = `user/environment/${environmentId}/status`;
    return (await apiFetch.get(endpoint)) as EnvironmentUserStatus;
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

export function getBookmarks({ categoryId, cursor, searchParam }: QueryParams) {
  return async function () {
    const isFilteredByCategory = categoryId !== ALL_CATEGORIES;

    if (isFilteredByCategory) {
      return await getFilteredBookmarks({ categoryId, cursor, searchParam });
    }

    return await getUnfilteredBookmarks({ cursor, searchParam });
  };
}

async function getFilteredBookmarks({ categoryId, cursor, searchParam }: QueryParams) {
  const endpoint = `bookmarks/environments?cursor=${cursor}&search=${searchParam}&category_id=${categoryId}`;

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

async function getUnfilteredBookmarks({ cursor, searchParam }: { cursor: string; searchParam: string }) {
  const endpoint = `bookmarks/environments?cursor=${cursor}&search=${searchParam}`;

  return (await apiFetch.get(endpoint)) as EnvironmentsData;
}

export type CommentData = {
  id: number;
  content: string;
  environment_id: number;
  created_at: string;
  replies_count: number;
  is_deleted: boolean;
  author: {
    id: number;
    name: string;
    avatar: string;
    is_admin: boolean;
  };
  environment: {
    id: number;
    name: string;
  };
};

export type CommentsPage = {
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

export type RepliesData = {
  id: number;
  content: string;
  is_read: boolean;
  is_deleted: boolean;
  is_meta: boolean;
  comment_id: number;
  created_at: string;
  recipient: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
    avatar: string;
    is_admin: boolean;
  };
};

export type RepliesPage = {
  success: boolean;
  data: {
    current_page: number;
    data: RepliesData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
};

export function getReplies({ commentId, page }: { commentId: number; page: number }) {
  return async function () {
    const endpoint = `comments/${commentId}/replies?page=${page}`;
    return (await apiFetch.get(endpoint)) as RepliesPage;
  };
}

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
  const response = await fetch(`${APP_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(token),
    },
  });

  if (response.ok || response.status === 401) {
    // 401 === session timed out
    return new Response(); // success
  }

  throw new Error("Something went wrong.");
};

export const logoutSuccessNotification = () => {
  showNotification({
    color: "blue",
    title: "Logged out",
    message: "You were successfully logged out.",
    styles: notificationStyles,
  });
};

export const genericErrorNotification = () => {
  showNotification({
    color: "red",
    title: "Error!",
    message: "Something went wrong.",
    styles: notificationStyles,
  });
};

export const invalidAvatarSizeErrorNotification = () => {
  showNotification({
    color: "red",
    title: "Error",
    message: "Avatar must be 700kb or less",
    styles: notificationStyles,
  });
};

export const logoutErrorNotification = genericErrorNotification;

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

export const registerErrorNotification = genericErrorNotification;

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

export type UpdateUserFormValues = {
  displayName?: string;
  email?: string;
};

type UpdateUserPayload = {
  name?: string;
  email?: string;
};

export type UpdateUserMetadata = {
  payload: UpdateUserPayload;
  form: UseFormReturnType<{ displayName: string; email: string }>;
};

export const attemptUserUpdate = async (payload: UpdateUserPayload) => {
  return (await apiFetch.post("user", payload)) as User;
};

export const detectChangedFields = (meta: UpdateUserMetadata) => ({
  nameWasChanged: meta.payload.name !== undefined,
  emailWasChanged: meta.payload.email !== undefined,
});

export const userSettingsUpdateSuccessNotification = () => {
  showNotification({
    color: "lime",
    title: "Updated!",
    message: "Your settings were updated.",
    styles: notificationStyles,
  });
};

export const userSettingsUpdateErrorNotification = genericErrorNotification;

export const emailWasVerifiedNotification = () => {
  showNotification({
    color: "lime",
    title: "Verified!",
    message: "Your email has been verified.",
    styles: notificationStyles,
  });
};

type ChangePasswordPayload = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type ChangePasswordMetadata = {
  payload: ChangePasswordPayload;
  form: UseFormReturnType<ChangePasswordFormValues>;
};

export const attemptChangePassword = async (payload: ChangePasswordPayload) => {
  return await apiFetch.post("user/password", payload);
};

export const changePasswordErrorNotification = () => {
  showNotification({
    color: "red",
    title: "Error!",
    message: "Failed to change your password. Make sure your old password is correct.",
    styles: notificationStyles,
  });
};

export const changePasswordSuccessNotification = () => {
  showNotification({
    color: "lime",
    title: "Success!",
    message: "Your password was updated.",
    styles: notificationStyles,
  });
};

export type AttemptToggleActionMetadata = {
  data: EnvironmentUserStatus | undefined;
  id: number;
};

export const attemptToggleBookmark = async ({ data, id }: AttemptToggleActionMetadata) => {
  // data is undefined for a small window of time while data is fetched client-side. (Button shows loading spinner during this window.)
  if (data === undefined) {
    return new Promise((_, reject) => reject());
  }

  const isBookmarked = data.data.is_bookmarked;
  const payload = {
    environment_id: `${id}`,
  };
  const endpoint = "bookmarks/environments";

  if (isBookmarked) {
    return apiFetch.delete(endpoint, payload);
  }

  return apiFetch.post(endpoint, payload);
};

export const attemptToggleLike = async ({ data, id }: AttemptToggleActionMetadata) => {
  // data is undefined for a small window of time while data is fetched client-side. (Button shows loading spinner during this window.)
  if (data === undefined) {
    return new Promise((_, reject) => reject());
  }

  const isLiked = data.data.is_liked;

  if (isLiked) {
    return apiFetch.post(`environments/${id}/unlike`);
  }

  return apiFetch.post(`environments/${id}/like`);
};

export type AttemptPostCommentMetadata = {
  stringId: string;
  body: {
    content: string;
  };
  textAreaRef: RefObject<HTMLTextAreaElement>;
  charCountTextRef: RefObject<HTMLParagraphElement>;
  setButtonIsEnabled: Dispatch<SetStateAction<boolean>>;
};

export type PostCommentResponse = {
  success: boolean;
  data: {
    content: string;
    environment_id: number;
    created_at: string;
    /**
     * same as data.environment.id
     */
    id: number;
    environment: {
      /**
       * same as data.id
       */
      id: number;
      name: string;
    };
  };
};

export const attemptPostComment = async ({ stringId, body }: AttemptPostCommentMetadata) => {
  return (await apiFetch.post(`environments/${stringId}/comments`, body)) as PostCommentResponse;
};

export const postCommentSuccessNotification = () => {
  showNotification({
    color: "lime",
    title: "Success!",
    message: "Your comment was posted.",
    styles: notificationStyles,
  });
};

export type AttemptPostReplyMetadata = {
  stringId: string;
  comment: CommentData;
  /**
   * Body should not include a recipient_id if the Reply target is a Comment.
   * Include a recipient_id if the target of this Reply is another Reply.
   */
  body: {
    content: string;
    recipient_id?: string;
  };
  recipient: {
    id: number;
    name: string;
  };
  is_meta: boolean;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  charCountTextRef: RefObject<HTMLParagraphElement>;
  setButtonIsEnabled: Dispatch<SetStateAction<boolean>>;
  hideTextAreaHandler: () => void;
  showRepliesHandler?: (repliesPage: RepliesPage) => void;
};

export type PostReplyResponse = {
  success: boolean;
  data: {
    content: string;
    is_meta: boolean;
    comment_id: number;
    created_at: string;
    id: number;
  };
};

export const attemptPostReply = async ({ comment, body }: AttemptPostReplyMetadata) => {
  return (await apiFetch.post(`comments/${comment.id}/replies`, body)) as Promise<PostReplyResponse>;
};

export const postReplySuccessNotification = () => {
  showNotification({
    color: "lime",
    title: "Success!",
    message: "Your reply was posted.",
    styles: notificationStyles,
  });
};
