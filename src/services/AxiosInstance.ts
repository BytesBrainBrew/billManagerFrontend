import axios from "axios";
import { statusCodeValue } from "../shared/statusCode";
import { frontendUrl } from "../shared/frontendUrl";
import { localStorageKey } from "../shared/cookies";
// extract the token from the local storage
const token = localStorage.getItem(localStorageKey.token);
export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
   "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token
  },
});

// controller this variable initiallise the class of the AbortController and use the method
const controller = new AbortController();

AXIOS_INSTANCE.interceptors.request.use(
  function (config) {
    if (!token) {
      // if token is not in the local storage then request is abort from the front-end
      controller.abort();
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AXIOS_INSTANCE.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response &&
      error.response.status === statusCodeValue.unauthorized
    ) {
      window.location.pathname = frontendUrl.login;
    }
    return Promise.reject(error);
  }
);
