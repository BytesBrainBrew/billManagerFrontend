import { Outlet, Navigate } from "react-router-dom";
import { frontendUrl } from "../shared/frontendUrl";
import { getCookies, localStorageKey } from "../shared/cookies";
const PrivateRoute = () => {
  const token = "getCookies()";
  console.log(getCookies())
  const localStoreToken = localStorage.getItem(localStorageKey.token)
  return localStoreToken ? <Outlet /> : <Navigate to={frontendUrl.login} replace />;
};

export default PrivateRoute;
