import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextFieldComponent } from "../../component/fieldType/TextField";
import { frontendUrl } from "../../shared/frontendUrl";
import { signUpType } from "../../shared/types/authType";
import { validateEmail } from "../../supportFiles/helperFunction";
import { statusCodeValue } from "../../shared/statusCode";
import { toast } from "react-toastify";
import { signUpDTO } from "../../shared/DTO/authDTO";
import { AUTH_SERVICES } from "../../services/auth/authServices";

export const SignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [formDataValue, setFormDataValue] = useState<signUpType>({
    email: {
      value: "",
      warning: false,
    },
    password: {
      value: "",
      warning: false,
    },
    username: {
      value: "",
      warning: false,
    },
  });

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
    let data: signUpType = { ...formDataValue };
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
      username: {
        ...data.username,
        warning: data.username.value === "",
      },
    };
    setFormDataValue({ ...data });
    if(!data.email.warning && !data.username.warning && !data.password.warning){
      signUpApiCall()
    }
  };

   // api intigration for the signup
   const signUpApiCall = () => {
    setLoading(true);
    const onSuccess = (res: any) => {
      setLoading(false);
      console.log("res", res);
      if(res.status === statusCodeValue.created){
         toast.success(res.data.message)
         navigate(frontendUrl.login)
      }
    };
    const onError = (err: any) => {
      setLoading(false);
      console.log("err", err);
       if(err.status === statusCodeValue.conflict){
        toast.error(err.response.data.message)
      }
    };
    const body: signUpDTO = {
      email: String(formDataValue.email.value),
      password: String(formDataValue.password.value),
      username: String(formDataValue.username.value)
    };
    AUTH_SERVICES.signUpService(body, onSuccess, onError); // call the login api service
  };
  console.log("formdata", formDataValue);
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
          Sign Up
        </Typography>
        <form onSubmit={validateDataOfForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextFieldComponent
                label="name"
                error={formDataValue.username.warning}
                onChange={onChange}
                errorMessage="enter valid name"
                value={formDataValue.username.value}
                name={"username"}
                type="text"
                placeholder="enter your name"
              />
            </Grid>
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
                disabled = {loading}
              >
               {loading ? "Loading" : "Sign Up"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={frontendUrl.login}>Login</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
