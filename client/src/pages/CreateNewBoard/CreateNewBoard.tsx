import { Typography, Container, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./CreateNewBoard.css";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Link from "@mui/material/Link";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import defaultProfile from "../../imgs/defaultProfile.png";
import usedBoard from "../../imgs/usedBoard.png";
import Stack from "@mui/material/Stack";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface State {
  name: string;
  description: string;
  emails: string;
}

export default function CreateNewBoard() {
  const NAME_LIMIT = 20;
  const DESCRIPTION_LIMIT = 50;

  const [values, setValues] = React.useState<State>({
    name: "Board Name",
    description: "Create a new board...",
    emails: "",
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
            href="YourBoards"
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
              color="secondary"
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
          style={{marginTop: "30px"}}
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
          >
            <Grid item xs={4}>
              <img src={defaultProfile} alt="Add A New Board" width={"200px"}></img>
              <Grid item justifyContent="center" alignItems="center" style={{marginBottom: "30px"}}>
                <Button variant="text" component="label" size="small">
                <PhotoCamera />
                &nbsp;Upload
                  <input type="file" hidden />
                </Button>
              </Grid>

              {/* Board Preview */}
              <img src={usedBoard} alt="Add A New Board" width={200}></img>
              <Typography
                className="inputTitle"
                variant="h6"
                color="secondary"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {values.name}
              </Typography>
              <Typography
                className="inputTitle"
                variant="body1"
                color="primary"
                sx={{ textAlign: "center" }}
              >
                {values.description}
              </Typography>
            </Grid>
          </Grid>

          {/*-------------------------------------------------------------------*/}

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
                helperText={`${values.name.length}/${NAME_LIMIT}`}
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
                helperText={`${values.description.length}/${DESCRIPTION_LIMIT}`}
                multiline
                style={{ fontWeight: "bold" }}
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
                helperText="Email, comma separated"
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
                  width: "30%",
                  height: "50px",
                }}
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
    </Box>
  );
}
