import axios from "axios";
import axiosInstance from "../../axios";
import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import Logo from "../../assets/logo.svg";
import { signUpEndPoint } from "../../authEndPoints";
import "./SignUp.scss";

interface SignUpErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [errors, setErrors] = useState<SignUpErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateData = () => {
    errors.name = "";
    errors.email = "";
    errors.password = "";
    errors.confirmPassword = "";

    let errorsExits = false;

    if (!name) {
      errors.name = "Please enter your name.";
      errorsExits = true;
    }

    if (!email) {
      errors.email = "Please enter your email.";
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
      errors.password = "Please enter your password.";
      errorsExits = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please re-enter your password.";
      errorsExits = true;
    } else if (password != confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      errorsExits = true;
    }

    setErrors({ ...errors });
    return !errorsExits;
  };

  const handleSignup = () => {
    if (!validateData()) {
      return;
    }

    axios
      .post(
        signUpEndPoint,
        { email: email, password: password, returnSecureToken: true },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Account Created!!!");
        console.log("Sign Up response is: ", res);
        axiosInstance
          .post("/addUser", {
            id: res.data.localId,
            name: name,
            email: email,
            birthDay: null,
            alternativeEmail: "",
            phoneNumber: "",
            overview: "",
            boards: [],
          })
          .then((res) => {
            console.log("user added to data base.");
            console.log("response is: ", res);
          })
          .catch((err) => {
            console.log("failed to add user to database", err);
          });
      })
      .catch((err) => {
        errors.email = "Email already exists.";
        setErrors({ ...errors });

        console.log("Failed to sign up user: ", err);
      });
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

  const handleNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setConfrimPassword(event.target.value);
  };

  return (
    <div className="signup-container">
      <Grid className="signup" direction="row" container spacing={2}>
        <Grid
          className="signup-left-container"
          container
          item
          md={5}
          lg={5}
          xl={5}
        >
          <Grid
            className="signup-inner-grid"
            justifyContent="center"
            alignItems="center"
            container
            item
            xs={12}
          >
            <Grid
              className="signup-inner-grid"
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
              <img className="signup-logo-image" src={Logo} />
              <h1 className="signup-app-name">Bulletin</h1>
              <h3 className="signup-app-description">
                Organize your household in a smart way{" "}
              </h3>
            </Grid>
            <Grid
              className="signup-inner-grid"
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={12}
            >
              <h4 className="signup-signup-redirect-text">
                Already have an account?
              </h4>
              <Button
                className="signup-signup-redirect-button"
                variant="contained"
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className="signup-inner-grid"
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
          md={7}
          lg={7}
          xl={7}
          direction="column"
          spacing={2}
        >
          <Grid item>
            <h1 className="signup-title">Sign Up</h1>
          </Grid>
          <Grid className="signup-inner-grid-item" item>
            <p>Name</p>
            <TextField
              className="signup-text-field"
              InputLabelProps={{ shrink: false }}
              value={name}
              onChange={handleNameChange}
              label={name === "" ? "Enter your full name" : ""}
              variant="outlined"
              error={errors.name != ""}
              helperText={errors.name}
            />
          </Grid>
          <Grid className="signup-inner-grid-item" item>
            <p>Email</p>
            <TextField
              className="signup-text-field"
              InputLabelProps={{ shrink: false }}
              value={email}
              onChange={handleEmailChange}
              label={email === "" ? "Enter your email address" : ""}
              variant="outlined"
              error={errors.email != ""}
              helperText={errors.email}
            />
          </Grid>
          <Grid className="signup-inner-grid-item" item>
            <p>Password</p>
            <TextField
              className="signup-text-field"
              InputLabelProps={{ shrink: false }}
              value={password}
              onChange={handlePasswordChange}
              label={password === "" ? "Enter your password" : ""}
              variant="outlined"
              type="password"
              error={errors.password != ""}
              helperText={errors.password}
            />
          </Grid>
          <Grid className="signup-inner-grid-item" item>
            <p>Confrim Password</p>
            <TextField
              className="signup-text-field"
              InputLabelProps={{ shrink: false }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              label={confirmPassword === "" ? "Re-enter your password" : ""}
              variant="outlined"
              type="password"
              error={errors.confirmPassword != ""}
              helperText={errors.confirmPassword}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleSignup}
              className="signup-button"
              variant="contained"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
