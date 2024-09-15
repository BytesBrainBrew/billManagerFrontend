import Cookies from "js-cookie";
export const getCookies = () => {
  const cookieToken = Cookies.get("jwt");
  console.log(cookieToken);
  //   return cookieToken ? cookieToken : null;
};

export const localStorageKey = {
  token: "token",
};
