import ky from "ky";
import { APP_URL, SANCTUM_CSRF } from "../config/config";
import { GET, POST, PUT, PATCH, DELETE } from "./constants";

type RequestBody = {
  [key: string]: string;
};

type Method = typeof GET | typeof POST | typeof PUT | typeof PATCH | typeof DELETE;

const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Referer", APP_URL);
        request.headers.set("Content-Type", "application/json");
      },
    ],
  },
});

export const apiFetch = async (url: string, method: Method, body?: RequestBody) => {
  // if (readCookie("X-XSRF-TOKEN") === null) {
  //   await api.get(SANCTUM_CSRF);
  // }
  switch (method) {
    case GET:
      return await api.get(url).json();
    case POST:
      return await api.post(url, body ? { json: body } : undefined).json();
    case PUT:
      return await api.put(url, body ? { json: body } : undefined).json();
    case PATCH:
      await api.patch(url, body ? { json: body } : undefined).json();
    case DELETE:
      await api.delete(url, body ? { json: body } : undefined).json();
  }
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
