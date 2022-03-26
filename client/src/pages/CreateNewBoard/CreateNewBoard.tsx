import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import "./CreateNewBoard.css";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import defaultProfile from "../../assets/defaultProfile.png";
import usedBoard from "../../assets/usedBoard.png";
import {Snackbar, useForkRef} from "@material-ui/core";
import { Alert, AlertColor } from "@mui/material";
import { selectUserData } from "../../actions/UserActions/UserSelector";
import { useTypedDispatch } from "../../hooks/ReduxHooks";
import { userLoggedIn } from "../../actions/UserActions/UserActionCreator";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { refreshUserStore } from "../../utils/RefreshUserStore";

import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface State {
  name: string;
  description: string;
  emails: string;
  photo: string;
}
interface CreateBoardErrors {
  name: string;
  description: string;
  emails: string;
}

export default function CreateNewBoard() {
  var emails;
  const userData = useTypedSelector(selectUserData);
  const dispatch = useTypedDispatch();
  const NAME_LIMIT = 20;
  const DESCRIPTION_LIMIT = 50;
  const navigate = useNavigate();
  const [errors, setErrors] = useState<CreateBoardErrors>({
    name: "",
    description: "",
    emails: "",
  });
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const [values, setValues] = React.useState<State>({
    name: "Board Name",
    description: "Create a new board...",
    emails: "",
    photo: ""
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const validateData = () => {
    errors.name = "";
    errors.description = "";

    let errorsExits = false;

    if (!values.name || values.name.length>20) {
      errors.name = "Please enter a valid board Name.";
      errorsExits = true;
    }

    if (!values.description ||values.description.length>50) {
      errors.description = "Please enter a valid board description.";
      errorsExits = true;
    }
    
    emails = values.emails.replace(/\s/g,'').split(",");
    console.log(emails) 
    const invitation = []
    for (var i = 0; i < emails.length; i++) {
      if(emails.length==1 && emails[0]==''){
        break;
      }
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emails[i]
      )
      ) {
        errors.emails = "Please enter a set of valid emails.";
        errorsExits = true;
        break;
      }
    }
    setErrors({ ...errors });
    return !errorsExits;
  };
  // var board_id;
  const handleSaveBoard = () => {
    if (!validateData()) {
      return;
    }

    let success = true;
    const usersID = [];
    usersID.push(userData.id)
    axiosInstance
          .post("/addBoard", {
            name: values.name,
            description: values.description,
            users: usersID
          })
          .then((res) => {
            if (success) {
              setMessage("Board Added.");
              setMessageSeverity("success");

              const newBoard = res.data.board.id
              console.log(newBoard);
              console.log(userData);
              const Boards = [...userData.boards];
              Boards.push(newBoard);
              const newUserData = {...userData, boards: [...Boards]}
              axiosInstance
              .put("./editUser", newUserData)
              .then(() => {
                dispatch(userLoggedIn(newUserData));
                if (success) {
                  setMessageSeverity("success");
                } else {
                  setMessage("Information failed to be Added.");
                  setMessageSeverity("error");
                }
                setMessageOpen(true);
                navigate("/boardsView");
                
              })
              .catch((err) => {
                console.log("error editing user data: ", err);
                success = false;
              });
              
            }
          }).catch((err) => {
            console.log("error adding board: ", err);
            success = false;
          });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Back to boards link */}
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={2} mt={2} ml={4}>
          <Link
            className="BackToBoardsLink"
            variant="body1"
            href="boardsView"
            underline="hover"
          >
            Back to boards
          </Link>
        </Grid>

        {/* Create new board header container */}
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={4} mt={2} ml={8}>
            <Typography
              className="CreateNewBoardHeader"
              variant="h4"
              style={{color: "#68390D"}}
            >
              Create a new board!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{width: "100%", marginTop: "30px"}}
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            xl={5}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{width: "100%"}}
          >
            <Grid container item justifyContent="center" alignItems="center" style={{width: "100%"}} direction="column">
                <Grid item>
                  <Avatar
                    className="profileCircle"
                    sx={{ background: '#f0e6db', color: '#AA896B', fontWeight: 'bold', width: ' 200px', height: '200px', fontSize: '60px', marginTop:"10px", marginBottom:"10px" }} >
                    {values.name.split(' ')[0][0]}
                  </Avatar>
                </Grid>
             

              {/* Board Preview */}
              <Grid item>
              <img src={usedBoard} alt="Add A New Board" width={200}></img>
                
              </Grid>
              <Grid item><Typography
                className="inputTitle"
                variant="h6"
                color="secondary"
                sx={{ fontWeight: "bold", textAlign: "center", color: "#68390D" }}
              >
                {values.name}
              </Typography></Grid>
              <Grid item><Typography
                className="inputTitle"
                variant="body1"
                color="primary"
                sx={{ textAlign: "center" }}
              >
                {values.description}
              </Typography></Grid>
            </Grid>
          </Grid>


          <Grid
            item
            xs={12}
            lg={7}
            xl={7}
            md={6}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <div className="text-field-container">
              <Typography
                className="inputTitle"
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Board Name
              </Typography>
              <TextField
                className="InputText"
                variant="outlined"
                value={values.name}
                onChange={handleChange("name")}
                focused
                id="name-text"
                inputProps={{
                  maxlength: NAME_LIMIT,
                }}
                helperText={`${values.name.length}/${NAME_LIMIT}  ${errors.name}`}
                error={errors.name !== ""}
              />
            </div>
            <div className="text-field-container">
              <Typography
                className="inputTitle"
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Description
              </Typography>
              <TextField
                className="InputText"
                variant="outlined"
                value={values.description}
                onChange={handleChange("description")}
                focused
                align-items="left"
                id="description-text"
                inputProps={{
                  maxlength: DESCRIPTION_LIMIT,
                }}
                helperText={`${values.description.length}/${DESCRIPTION_LIMIT}  ${errors.description}`}
                multiline
                style={{ fontWeight: "bold" }}
                error={errors.description !== ""}
              />
            </div>
            <div className="text-field-container">
              <Typography
                className="inputTitle"
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Invite members
              </Typography>
              <TextField
                className="InputText"
                variant="outlined"
                value={values.emails}
                onChange={handleChange("emails")}
                focused
                multiline
                rows={4}
                align-items="left"
                id="emails-text"
                helperText={`Email, comma separated ${errors.emails}`}
                error={errors.emails !== ""}
              />
            </div>
            <Grid
              container
              item
              direction="row"
              style={{ width: "100%", marginTop: 30, marginBottom: 60 }}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                className="DiscardButton"
                variant="contained"
                style={{ width: "30%", height: "50px", marginRight: "30px" }}
                onClick={handleClickOpen}
              >
                Discard{" "}
              </Button>
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Are you sure you wish to discard this board?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You can not retreive the board once it has been deleted.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    autoFocus
                    onClick={handleClose}
                    variant="contained"
                    style={{ width: "100px", height: "50px" }}
                  >
                    Disagree
                  </Button>
                  <Button
                    onClick={handleClose}
                    href="boards"
                    autoFocus
                    variant="outlined"
                    style={{ width: "100px", height: "50px" }}
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                className="SaveButton"
                variant="outlined"
                style={{
                  width: "30%",
                  height: "50px",
                }}
                onClick={handleSaveBoard}
              >
                {" "}
                Create Board{" "}
              </Button>
            </Grid>

            {/* Save/Discard Buttons */}
            {/* <Stack spacing={2} pt={2} direction="row" alignItems="center">
              <Button
                className="DiscardButton"
                variant="contained"
                style={{ width: "250px", height: "50px" }}
                onClick={handleClickOpen}
              >
                Discard{" "}
              </Button>
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Are you sure you wish to discard this board?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You can not retreive the board once it has been deleted.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    autoFocus
                    onClick={handleClose}
                    variant="contained"
                    style={{ width: "100px", height: "50px" }}
                  >
                    Disagree
                  </Button>
                  <Button
                    onClick={handleClose}
                    href="YourBoards"
                    autoFocus
                    variant="outlined"
                    style={{ width: "100px", height: "50px" }}
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                className="SaveButton"
                variant="outlined"
                style={{
                  width: "250px",
                  height: "50px",
                }}
              >
                {" "}
                Create Board{" "}
              </Button>
            </Stack> */}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}
      >
        <Alert severity={messageSeverity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>

  );
}