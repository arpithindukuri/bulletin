import React, { useState } from "react";
import profile from "../../assets/profile.svg";
import "./AccountInfo.scss";
import SideDrawer from "../../components/SideDrawer";
import { Grid, TextField, makeStyles, Button } from "@material-ui/core";

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
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [alternativeEmail, setAlternativeEmail] = useState("");
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
    // validate data here
    return false;
  };

  const handleSave = () => {
    if (!validateData()) {
      return;
    }

    // make API calls to backend
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
              <h1 className="account-panel-name">John Doe</h1>
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
    </>
  );
};

export default AccountInfo;
