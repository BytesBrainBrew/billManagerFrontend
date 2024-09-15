import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Login } from "./pages/auth/login";
import { SignUp } from "./pages/auth/signUp";
import InformationPage from "./pages/dataInformation/dataInformation";
import { frontendUrl } from "./shared/frontendUrl";
import PrivateRoute from "./routes/privateRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path={frontendUrl.login} element={<Login />} />
        <Route path={frontendUrl.signUp} element={<SignUp />} />
        <Route path="*" element={<h1>Not found</h1>} /> 
        <Route element={<PrivateRoute />}>
          <Route path={frontendUrl.dataInfoPage} element={<InformationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
