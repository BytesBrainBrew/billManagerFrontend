import axios from "axios";
import { API_URL } from "../../shared/ApiUrl";
import { loginDTO, signUpDTO } from "../../shared/DTO/authDTO";
import { AXIOS_INSTANCE } from "../AxiosInstance";

const loginService = (
  dto: loginDTO,
  onSuccess: (res: any) => void = () => {},
  onError: (err: any) => void = () => {}
) => {
  axios
    .post(process.env.REACT_APP_API_URL + API_URL.login, dto, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    })
    .then((res) => onSuccess(res))
    .catch((err) => onError(err));
};

const signUpService = (
  dto: signUpDTO,
  onSuccess: (res: any) => void = () => {},
  onError: (err: any) => void = () => {}
) => {
  axios
    .post(process.env.REACT_APP_API_URL + API_URL.signUp, dto, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => onSuccess(res))
    .catch((err) => onError(err));
};

const logoutService = (
    onSuccess: (res: any) => void = () => {},
    onError: (err: any) => void = () => {}
  ) => {
    AXIOS_INSTANCE
      .delete(API_URL.logout)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  };

export const AUTH_SERVICES = {
  loginService,
  signUpService,
  logoutService
};
