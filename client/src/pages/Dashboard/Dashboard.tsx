import React, { useState } from "react";
import profile from "../../assets/profile.svg";
import "./Dashboard.scss";
import SideDrawer from "../../components/SideDrawer";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

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
  const classes = useStyles();
  const [overview, setOverview] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState<null | Date>(null);
  const [email, setEmail] = useState("");

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
    // call APIs
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
              <h1 className="dashboard-user-info">John Doe</h1>
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
                  {/* <MuiPickersUtilsProvider utils={MomentUtils}>
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
                  </MuiPickersUtilsProvider> */}
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
    </>
  );
};

export default Dashboard;
