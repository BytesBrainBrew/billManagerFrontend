import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextFieldComponent } from "../../component/fieldType/TextField";
import { frontendUrl } from "../../shared/frontendUrl";
import { loginType } from "../../shared/types/authType";
import { validateEmail } from "../../supportFiles/helperFunction";
import { AUTH_SERVICES } from "../../services/auth/authServices";
import { loginDTO } from "../../shared/DTO/authDTO";
import { statusCodeValue } from "../../shared/statusCode";
import { toast } from "react-toastify";
import { localStorageKey } from "../../shared/cookies";

export const Login = () => {
  const navigate = useNavigate()
  const [formDataValue, setFormDataValue] = useState<loginType>({
    email: {
      value: "",
      warning: false,
    },
    password: {
      value: "",
      warning: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataValue((prev) => ({
      ...prev,
      [name]: {
        value: value.trimStart(),
        warning: name == "email" ? !validateEmail(value) : value === "",
      },
    }));
  };

  // validate the form data
  const validateDataOfForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data: loginType = { ...formDataValue };
    data = {
      ...data,
      email: {
        ...data.email,
        warning: !validateEmail(String(data.email.value)),
      },
      password: {
        ...data.password,
        warning: data.password.value === "",
      },
    };
    setFormDataValue({ ...data });
    if (!data.email.warning && !data.password.warning) {
      loginAApiCall();
    }
  };

  // api intigration for the login
  const loginAApiCall = () => {
    setLoading(true);
    const onSuccess = (res: any) => {
      setLoading(false);
      console.log("res", res);
      if(res.status === statusCodeValue.statusOk){
         toast.success(res.data.message)
         navigate(frontendUrl.dataInfoPage)
         localStorage.setItem(localStorageKey.token,res.data.token)
      }
    };
    const onError = (err: any) => {
      setLoading(false);
      console.log("err", err);
       if(err.status === statusCodeValue.unauthorized){
        toast.error(err.response.data.message)
      }
    };
    const body: loginDTO = {
      email: String(formDataValue.email.value),
      password: String(formDataValue.password.value),
    };
    AUTH_SERVICES.loginService(body, onSuccess, onError); // call the login api service
  };
  console.log("----", formDataValue);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: 30, maxWidth: 400, width: "100%" }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={validateDataOfForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldComponent
                label="email"
                error={formDataValue.email.warning}
                onChange={onChange}
                errorMessage="enter valid email"
                value={formDataValue.email.value}
                name={"email"}
                type="text"
                placeholder="enter your email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldComponent
                label="password"
                error={formDataValue.password.warning}
                onChange={onChange}
                errorMessage="enter your password"
                value={formDataValue.password.value}
                name={"password"}
                type="password"
                placeholder="enter your password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading" : "Login"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={frontendUrl.signUp}>Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
