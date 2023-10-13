import { getCookie, setCookie } from "cookies-next";
import ky from "ky";
import { useMutation, useQueryClient } from "react-query";
import { USER_DATA_COOKIE_KEY } from "../../components/layout/constants";
import { API_URL, SANCTUM } from "../../config/config";
import { useAuth, User } from "../../contexts/AuthProvider";
import { COMMENTS } from "../../query-client/constants";
import { genericErrorNotification, invalidAvatarSizeErrorNotification } from "./helpers";

export const useUpdateAvatarMutation = () => {
  const { setUser } = useAuth();

  const queryClient = useQueryClient();

  return useMutation(updateAvatar, {
    onSuccess(user) {
      setUser(user);
      setCookie(USER_DATA_COOKIE_KEY, JSON.stringify(user));

      queryClient.resetQueries([COMMENTS]);
    },
    onError(e) {
      if (e instanceof Error && e.message.includes("700kb")) {
        invalidAvatarSizeErrorNotification();
        return;
      }

      genericErrorNotification();
    },
  });
};

async function updateAvatar(file: File) {
  const formData = createFormData(file);
  if (file.size > 700_000) {
    throw new Error("Avatar must be <= 700kb");
  }

  let token = getCookie("XSRF-TOKEN");

  if (typeof token === "string") {
    token = decodeURIComponent(token) as string;
  } else {
    await ky.get(SANCTUM, { credentials: "include" });
    token = getCookie("XSRF-TOKEN");
    token = decodeURIComponent(token as string);
  }

  return await uploadAvatar(formData, token);
}

function createFormData(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);

  return formData;
}

async function uploadAvatar(formData: FormData, csrfToken: string) {
  const res = await fetch(`${API_URL}/user/avatar`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      "X-XSRF-TOKEN": csrfToken,
    },
  });
  return (await res.json()) as User;
}
