import { getCookie } from "cookies-next";
import ky from "ky";
import { API_URL, APP_URL, SANCTUM } from "../config/config";

type RequestBody = {
  [key: string]: string;
};

const updateCsrfToken = async (request: Request) => {
  let token = getCookie("XSRF-TOKEN");

  if (typeof token === "string") {
    request.headers.set("X-XSRF-TOKEN", decodeURIComponent(token));
  } else {
    await ky.get(SANCTUM, { credentials: "include" });
    token = getCookie("XSRF-TOKEN");
    request.headers.set("X-XSRF-TOKEN", decodeURIComponent(token as string));
  }

  request.headers.set("Content-Type", "application/json");
  request.headers.set("Accept", "application/json");
};

const api = ky.extend({
  hooks: {
    beforeRequest: [updateCsrfToken],
  },
  prefixUrl: API_URL,
  credentials: "include",
});

const auth = ky.extend({
  hooks: {
    beforeRequest: [updateCsrfToken],
  },
  prefixUrl: APP_URL,
  credentials: "include",
});

export const apiFetch = {
  async get(url: string) {
    return await api.get(url).json();
  },
  async post(url: string, body?: RequestBody) {
    return await api.post(url, body ? { json: body } : undefined).json();
  },
  async put(url: string, body?: RequestBody) {
    return await api.put(url, body ? { json: body } : undefined).json();
  },
  async patch(url: string, body?: RequestBody) {
    return await api.patch(url, body ? { json: body } : undefined).json();
  },
  async delete(url: string, body?: RequestBody) {
    return await api.delete(url, body ? { json: body } : undefined).json();
  },
};

export const authFetch = {
  async get(url: string) {
    return await auth.get(url).json();
  },
  async post(url: string, body?: RequestBody) {
    return await auth.post(url, body ? { json: body } : undefined).json();
  },
  async put(url: string, body?: RequestBody) {
    return await auth.put(url, body ? { json: body } : undefined).json();
  },
  async patch(url: string, body?: RequestBody) {
    return await auth.patch(url, body ? { json: body } : undefined).json();
  },
  async delete(url: string, body?: RequestBody) {
    return await auth.delete(url, body ? { json: body } : undefined).json();
  },
};
