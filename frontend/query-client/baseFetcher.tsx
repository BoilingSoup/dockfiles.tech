import ky from "ky";
import { API_URL, APP_URL, SANCTUM_CSRF } from "../config/config";

type RequestBody = {
  [key: string]: string;
};

const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Referer", APP_URL);
        request.headers.set("Content-Type", "application/json");
      },
    ],
  },
  prefixUrl: API_URL,
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
    return await api.put(url, body ? { json: body } : undefined).json();
  },
  async delete(url: string, body?: RequestBody) {
    return await api.put(url, body ? { json: body } : undefined).json();
  },
};

function readCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
