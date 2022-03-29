import React, { useState } from "react";
import profile from "./profile.svg";
import "./Dashboard.scss";
import SideDrawer from "../../components/SideDrawer";
import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import { selectUserData } from "../../actions/UserActions/UserSelector";
import axiosInstance from "../../axios";
import { useTypedDispatch } from "../../hooks/ReduxHooks";
import { userLoggedIn } from "../../actions/UserActions/UserActionCreator";
import { Alert, AlertColor } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: -10,
    minWidth: 200,
    width: "100%",
    "& .MuiFilledInput-root": {
      background: "#CBDAE1",
    },
  },
}));

const Dashboard = () => {
  const userData = useTypedSelector(selectUserData);
  const dispatch = useTypedDispatch();
  const classes = useStyles();
  const [overview, setOverview] = useState(userData.overview);
  const [name, setName] = useState(userData.name);
  const [birthday, setBirthday] = useState<null | Date>(userData.birthDay);
  const [email, setEmail] = useState(userData.email);
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const handleOverviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOverview(event.target.value);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const handleBirthdayChange = (selectedDate: Date) => {
    setBirthday(selectedDate);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleSave = () => {
    const newUserData = {
      ...userData,
      overview: overview,
      name: name,
      birthDay: birthday,
    };

    axiosInstance
      .get("/readUser", { params: { userID: userData.id } })
      .then((res) => {
        axiosInstance
          .put("/updateUser", { ...res, ...newUserData })
          .then(() => {
            console.log("user data updated");
            dispatch(userLoggedIn(newUserData));
            setMessage("Information updated.");
            setMessageSeverity("success");
            setMessageOpen(true);
          })
          .catch((err) => {
            console.log("error editing user data: ", err);
            setMessage("Information update failed.");
            setMessageSeverity("error");
            setMessageOpen(true);
          });
      });
  };

  return (
    <>
      <SideDrawer />
      <div className="dashboard">
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: "100%" }}
        >
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="dashboard-user-info-container"
          >
            <Grid item>
              <img src={profile} className="dashboard-profile-pic" />
            </Grid>
            <Grid item>
              <h1 className="dashboard-user-info">{userData.name}</h1>
            </Grid>
            <Grid item>
              <h1 className="dashboard-user-info">Calgary, Alberta</h1>
            </Grid>
            <Grid item>
              <h1 className="dashboard-user-info">Last Login: 20/02/2022</h1>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{ width: "100%" }}
              spacing={2}
            >
              <Grid className="dashboard-grid-item" xl={10} xs={10} item>
                <p>Brief Overview</p>
                <TextField
                  style={{ width: "100%" }}
                  className={classes.textField}
                  InputLabelProps={{ shrink: false }}
                  value={overview}
                  onChange={handleOverviewChange}
                  label={
                    overview === ""
                      ? "Tell everyone about yourself (max 150 characters)"
                      : ""
                  }
                  variant="filled"
                />
              </Grid>
              <Grid
                xl={3}
                lg={3}
                md={3}
                xs={10}
                justifyContent="center"
                alignItems="center"
                item
                container
              >
                <Grid item style={{ width: "100%" }}>
                  <p>Name</p>
                  <TextField
                    className={classes.textField}
                    InputLabelProps={{ shrink: false }}
                    value={name}
                    onChange={handleNameChange}
                    label={name === "" ? "Name" : ""}
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <Grid
                xl={3}
                lg={3}
                md={3}
                xs={10}
                justifyContent="center"
                alignItems="center"
                item
                container
              >
                <Grid item style={{ width: "100%" }}>
                  <p>Birthday</p>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      className={classes.textField}
                      keyboard
                      placeholder="YYYY-MM-DD"
                      format={"YYYY-MM-DD"}
                      value={birthday}
                      onChange={handleBirthdayChange}
                      disableOpenOnEnter
                      animateYearScrolling={false}
                      autoOk={true}
                      variant="filled"
                      clearable
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              <Grid
                xl={3}
                lg={3}
                md={3}
                xs={10}
                item
                container
                justifyContent="center"
                alignItems="center"
              >
                <Grid item style={{ width: "100%" }}>
                  <p>Email</p>
                  <TextField
                    className={classes.textField}
                    InputLabelProps={{ shrink: false }}
                    value={email}
                    onChange={handleEmailChange}
                    label={email === "" ? "Email" : ""}
                    variant="filled"
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className="save-button-container">
          <Button
            onClick={handleSave}
            className="save-button"
            variant="contained"
          >
            Save
          </Button>
        </div>
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

export default Dashboard;
