import React, { useState } from "react";
import profile from "./profile.svg";
import "./Account.scss";
import SideDrawer from "../../components/SideDrawer";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  Snackbar,
} from "@material-ui/core";
import { changePasswordEndPoint } from "../../authEndPoints";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import { selectUserData } from "../../actions/UserActions/UserSelector";
import { useTypedDispatch } from "../../hooks/ReduxHooks";
import axios from "axios";
import axiosInstance from "../../axios";
import { userLoggedIn } from "../../actions/UserActions/UserActionCreator";
import { Alert, AlertColor } from "@mui/material";

interface AccountEditErrors {
  password: string;
  confrimPassword: string;
  phoneNumber: string;
  primaryEmail: string;
  alternativeEmail: string;
}

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: -10,
    width: "100%",
    minWidth: 200,
    "& .MuiFilledInput-root": {
      background: "#CBDAE1",
    },
  },
}));

const AccountInfo = () => {
  const userData = useTypedSelector(selectUserData);
  const dispatch = useTypedDispatch();
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [primaryEmail, setPrimaryEmail] = useState(userData.email);
  const [alternativeEmail, setAlternativeEmail] = useState(
    userData.alternativeEmail
  );
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");
  const [errors, setErrors] = useState<AccountEditErrors>({
    password: "",
    confrimPassword: "",
    phoneNumber: "",
    primaryEmail: "",
    alternativeEmail: "",
  });

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handlePrimaryEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPrimaryEmail(event.target.value);
  };

  const handleAlternativeEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAlternativeEmail(event.target.value);
  };

  const validateData = () => {
    errors.password = "";
    errors.confrimPassword = "";
    errors.phoneNumber = "";
    errors.primaryEmail = "";
    errors.alternativeEmail = "";

    let errorsExits = false;
    if (password) {
      if (!confirmPassword) {
        errors.confrimPassword = "Please re-type your password";
        errorsExits = true;
      } else if (password != confirmPassword) {
        errors.confrimPassword = "Passwords do not match";
        errorsExits = true;
      }
    }

    setErrors({ ...errors });

    return !errorsExits;
  };

  const handleSave = () => {
    if (!validateData()) {
      return;
    }

    let success = true;

    if (password) {
      axios
        .post(
          changePasswordEndPoint,
          {
            idToken: userData.idToken,
            password: password,
            returnSecureToken: true,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then(() => {
          console.log("passowrd updated!");
          if (success) {
            setMessage("Password updated.");
            setMessageSeverity("success");
          } else {
            setMessage("Password update failed.");
            setMessageSeverity("error");
          }
          setMessageOpen(true);
        })
        .catch((err) => {
          console.log("error changing user's password: ", err);
          success = false;
        });
    }

    if (phoneNumber || alternativeEmail) {
      const newUserData = {
        ...userData,
        alternativeEmail: alternativeEmail,
        phoneNumber: phoneNumber,
      };

      axiosInstance
        .put("/editUser", newUserData)
        .then(() => {
          console.log("user data updated");
          dispatch(userLoggedIn(newUserData));
          if (success) {
            setMessage("Information updated.");
            setMessageSeverity("success");
          } else {
            setMessage("Information update failed.");
            setMessageSeverity("error");
          }
          setMessageOpen(true);
        })
        .catch((err) => {
          console.log("error editing user data: ", err);
          success = false;
        });
    }
  };

  return (
    <>
      <SideDrawer />

      <div className="account">
        <Grid item container direction="row" style={{ height: "100%" }}>
          <Grid
            item
            xl={5}
            lg={5}
            md={5}
            xs={12}
            className="account-panel-container"
          >
            <div className="account-panel">
              <img src={profile} className="profile-pic"></img>
              <h1 className="account-panel-name">{userData.name}</h1>
              <h1 className="account-panel-last-password">
                Last Password Change: 20/01/2022
              </h1>
            </div>
          </Grid>
          <Grid
            item
            container
            direction="column"
            xl={7}
            lg={7}
            md={7}
            xs={12}
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%", width: "100%" }}
          >
            <h1 className="account-edit-title">Account</h1>
            <Grid className="account-edit-grid-item" item>
              <p>Change Your Password</p>
              <TextField
                className={classes.textField}
                InputLabelProps={{ shrink: false }}
                value={password}
                type="password"
                onChange={handlePasswordChange}
                label={password === "" ? "Enter your new password" : ""}
                variant="filled"
                error={errors.password != ""}
                helperText={errors.password}
              />
            </Grid>
            <Grid className="account-edit-grid-item" item>
              <p>Confirm New Password</p>
              <TextField
                className={classes.textField}
                InputLabelProps={{ shrink: false }}
                value={confirmPassword}
                type="password"
                onChange={handleConfirmPasswordChange}
                label={
                  confirmPassword === "" ? "Confrim your new password" : ""
                }
                variant="filled"
                error={errors.confrimPassword != ""}
                helperText={errors.confrimPassword}
              />
            </Grid>
            <Grid className="account-edit-grid-item" item>
              <p>Add Phone Number</p>
              <TextField
                className={classes.textField}
                InputLabelProps={{ shrink: false }}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                label={phoneNumber === "" ? "Provide your phone number" : ""}
                variant="filled"
                error={errors.phoneNumber != ""}
                helperText={errors.phoneNumber}
              />
            </Grid>

            <Grid className="account-edit-grid-item" item>
              <p>Primary Email Address</p>
              <TextField
                className={classes.textField}
                InputLabelProps={{ shrink: false }}
                value={primaryEmail}
                onChange={handlePrimaryEmailChange}
                label={primaryEmail === "" ? "Primary Email" : ""}
                variant="filled"
                error={errors.primaryEmail != ""}
                helperText={errors.primaryEmail}
                disabled
              />
            </Grid>

            <Grid className="account-edit-grid-item" item>
              <p>Alternative Email Address</p>
              <TextField
                className={classes.textField}
                InputLabelProps={{ shrink: false }}
                value={alternativeEmail}
                onChange={handleAlternativeEmailChange}
                label={alternativeEmail === "" ? "Alternative Email" : ""}
                variant="filled"
                error={errors.alternativeEmail != ""}
                helperText={errors.alternativeEmail}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleSave}
                className="save-button"
                variant="contained"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}
      >
        <Alert severity={messageSeverity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountInfo;
