import axios from "axios";
import axiosInstance from "../../axios";
import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import Logo from "../../assets/logo.svg";
import { signInEndPoint } from "../../authEndPoints";
import { useTypedDispatch } from "../../hooks/ReduxHooks";
import { userLoggedIn } from "../../actions/UserActions/UserActionCreator";
import { useNavigate } from "react-router-dom";
import SpinnerButton from "../../components/SpinnerButton";
import "./LogIn.scss";
import { format } from "date-fns";

interface LogInErrors {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LogInErrors>({
    email: "",
    password: "",
  });

  const validateData = () => {
    errors.email = "";
    errors.password = "";
    let errorsExits = false;
    if (!email) {
      errors.email = "Please enter an email.";
      errorsExits = true;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      errors.email = "Please enter a valid email.";
      errorsExits = true;
    }

    if (!password) {
      errors.password = "Please enter a password.";
      errorsExits = true;
    }

    setErrors({ ...errors });
    return !errorsExits;
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleLogIn = () => {
    if (!validateData()) {
      return;
    }
    setLoginLoading(true);
    axios
      .post(
        signInEndPoint,
        { email: email, password: password, returnSecureToken: true },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Sign In response is: ", res);
        localStorage.setItem("refresh", res.data.refreshToken);
        axiosInstance
          .get("/readUser", { params: { userID: res.data.localId } })
          .then((uData) => {
            setLoginLoading(false);
            const loginTime = new Date();
            const lastLogin = parseInt(format(loginTime, "T"));
            dispatch(
              userLoggedIn({
                ...uData.data.content,
                idToken: res.data.idToken,
                lastLogin,
              })
            );
            navigate("/boardsView");
          })
          .catch((userError) => {
            console.log("error while getting user info: ", userError);
            setLoginLoading(false);
          });
      })
      .catch((err) => {
        if (err.response.data.error.message == "EMAIL_NOT_FOUND") {
          errors.email = "Email not found.";
        } else if (err.response.data.error.message == "INVALID_PASSWORD") {
          errors.password = "Password incorrect.";
        }
        setLoginLoading(false);

        setErrors({ ...errors });
        console.log("Failed to sign user in: ", err);
      });
  };

  const handleSignUpCLick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <Grid className="login" direction="row" container spacing={2}>
        <Grid
          className="login-left-container"
          justifyContent="center"
          alignItems="center"
          container
          item
          md={5}
          lg={5}
          xl={5}
        >
          <Grid
            className="login-inner-grid"
            justifyContent="center"
            alignItems="center"
            container
            item
            xs={12}
          >
            <Grid
              className="login-inner-grid"
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
              <img className="login-logo-image" src={Logo} />
              <h1 className="login-app-name">Bulletin</h1>
              <h3 className="login-app-description">
                Organize your household in a smart way{" "}
              </h3>
            </Grid>
            <Grid
              className="login-inner-grid"
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
              <h4 className="login-signup-redirect-text">New Here ?</h4>
              <Button
                onClick={handleSignUpCLick}
                className="login-signup-redirect-button"
                variant="contained"
              >
                Sign up now!
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className="login-inner-grid"
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
          md={7}
          lg={7}
          xl={7}
          direction="column"
          spacing={4}
        >
          <Grid item>
            <h1 className="login-title">Log In</h1>
          </Grid>
          <Grid className="login-inner-grid-item" item>
            <p>Email</p>
            <TextField
              id="login-username-email-field"
              className="login-text-field"
              InputLabelProps={{ shrink: false }}
              value={email}
              onChange={handleEmailChange}
              label={email === "" ? "Email" : ""}
              variant="outlined"
              error={errors.email != ""}
              helperText={errors.email}
            />
          </Grid>
          <Grid className="login-inner-grid-item" item>
            <p>Password</p>
            <TextField
              id="login-password-field"
              className="login-text-field"
              InputLabelProps={{ shrink: false }}
              value={password}
              onChange={handlePasswordChange}
              label={password === "" ? "Password" : ""}
              variant="outlined"
              type="password"
              error={errors.password != ""}
              helperText={errors.password}
            />
          </Grid>
          <Grid item>
            <SpinnerButton
              onClick={handleLogIn}
              className="login-button"
              title="Log In"
              loading={loginLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LogIn;
