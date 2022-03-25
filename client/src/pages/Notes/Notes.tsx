import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import NoteRow from "./NoteRow";
import "./Notes.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertColor } from "@mui/material";

interface NotesProp {
  name: string;
  date: string;
  tags: string[];
  content: string;
}
interface State {
  name: string;
  date: string;
  tags: string[];
  content: string;
}
interface CreateNoteErrors {
  name: string;
  content: string;
}
const Notes: React.FC = () => {
  const params = useParams();
  const [popupState, setPopupState] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [notes, setNotes] = useState<Array<NotesProp>>([]);
  const [noteAdded, setNoteAdded] = useState(false);

  const [values, setValues] = React.useState<State>({
    name: "",
    date: "",
    tags: [],
    content: "",
  });
  const [errors, setErrors] = useState<CreateNoteErrors>({
    name: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/getNotes", { params: { board_id: params.board_id } })
      .then((res) => {
        if (success) {
          setNotes(res.data.notes);
        }
      })
      .catch((err) => {
        console.log("error getting user boards: ", err);
        success = false;
      });
  }, [noteAdded]);

  useEffect(() => {
    axiosInstance
      .get("/getBoard", { params: { id: params.board_id } })
      .then((res) => {
        setBoardName(res.data.board.data.name);
        console.log("Information recieved Successfully");
      })
      .catch((err) => {
        console.log("error getting user boards: ", err);
      });
  }, [params.board_id]);

  const validateData = () => {
    errors.name = "";
    errors.content = "";

    let errorsExits = false;
    if (!values.name) {
      errors.name = "Please enter a valid note Name.";
      errorsExits = true;
    }

    if (!values.content) {
      errors.content = "Please enter a valid note content.";
      errorsExits = true;
    }

    setErrors({ ...errors });
    return !errorsExits;
  };

  const handleSaveNote = () => {
    if (!validateData()) {
      return;
    }
    console.log(params.board_id);
    console.log(values);
    let success = true;
    axiosInstance
      .post("/addNote", values, { params: { id: params.board_id } })
      .then((res) => {
        console.log(res);
        if (success) {
          setMessage("Note Added.");
          setMessageSeverity("success");
          setNoteAdded(!noteAdded);
        } else {
          setMessage("Note cannot be added.");
          setMessageSeverity("error");
        }
      })
      .catch((err) => {
        console.log("error adding note: ", err);
        success = false;
      });
    values.name = "";
    values.content = "";
    setPopupState(false);
  };

  return (
    <Container sx={{ height: "100vh" }}>
      {popupState ? (
        <div className="overlay">
          <div className="overlayBox">
            <div className="noteHeader">
              <Typography variant="h6">New Note</Typography>
              <TextField
                variant="standard"
                defaultValue={"Note Name..."}
                onChange={handleChange("name")}
              ></TextField>
              <Button onClick={() => setPopupState(false)}>
                <Typography variant="h5">X</Typography>
              </Button>
            </div>
            <div className="noteContent">
              <textarea onChange={handleChange("content")}></textarea>
            </div>
            <div className="saveDiv">
              <Button className="saveButton" onClick={handleSaveNote}>
                Save Note
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <a href="/boards">
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="left"
          sx={{ pt: "1vh" }}
        >
          Back to Board {boardName} - Main
        </Typography>
      </a>

      <Typography className="notesTitle" variant="h3">
        Notes
      </Typography>

      <Box>
        <Box className="notesTable">
          <Box className="notesTableRow">
            <Box width={"60%"}>
              <Typography fontWeight={"bold"}>Note Title</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography fontWeight={"bold"}>Date Created</Typography>
            </Box>
            <Box width={"10%"}>
              <Typography fontWeight={"bold"}>Tags</Typography>
            </Box>
            <Box width={"5%"}></Box>
            <Box width={"5%"}></Box>
          </Box>
          {notes.map((notes, idx) => {
            return (
              <Box key={idx} className="notesTableRow">
                <NoteRow
                  name={notes.name}
                  date={notes.date}
                  tags={notes.tags}
                  content={notes.content}
                ></NoteRow>
              </Box>
            );
          })}
          <Box className="notesTableRow tableCellsFormatting addNewBox">
            <Button
              variant="text"
              fullWidth={true}
              onClick={() => setPopupState(true)}
            >
              <Typography>+ Add New Note</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}
      >
        <Alert severity={messageSeverity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Notes;
