import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import NoteRow from "./NoteRow";
import "./Notes.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertColor } from "@mui/material";
import { Note } from "../../../../types";
import { format } from "date-fns";

interface CreateNoteErrors {
  name: string;
  content: string;
}

const Notes: React.FC = () => {
  const params = useParams();
  const [popupState, setPopupState] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [noteAdded, setNoteAdded] = useState(false);

  const [values, setValues] = React.useState<Note>({
    id: null,
    author: "Author",
    timestamp: parseInt(format(new Date(), "T")),
    content: "content",
  });
  const [errors, setErrors] = useState<CreateNoteErrors>({
    name: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");
  const handleChange =
    (prop: keyof Note) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValues((prev) => ({
        ...prev,
        [prop]: event.target.value,
        timestamp: parseInt(format(new Date(), "T")),
      }));
    };

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/readNotes", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res);
        if (success) {
          setNotes(res.data.content);
        }
      })
      .catch((err) => {
        console.log("error getting user boards: ", err);
        success = false;
      });
  }, [noteAdded]);

  useEffect(() => {
    axiosInstance
      .get("/readBoard", { params: { boardID: params.board_id } })
      .then((res) => {
        setBoardName(res.data.content.name);
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
    if (!values.author) {
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

  const handleEditNote = (
    id: string,
    newName: string,
    newContent: string,
    newDate: number
  ) => {
    console.log(id);
    console.log(newName);
    console.log(newContent);
    let success = true;

    const note: Note = {
      author: newName,
      content: newContent,
      id: id,
      timestamp: newDate,
    };

    axiosInstance
      .put("/updateNote", note, {
        params: { noteID: id, boardID: params.board_id },
      })
      .then((res) => {
        console.log(res);
        if (success) {
          setMessage("Note edited.");
          setMessageSeverity("success");
          setNoteAdded(!noteAdded);
        } else {
          setMessage("Note cannot be edited.");
          setMessageSeverity("error");
        }
      })
      .catch((err) => {
        console.log("error deleting note: ", err);
        success = false;
      });
  };

  const handleDeleteNote = (id: string) => {
    console.log(id);
    let success = true;
    axiosInstance
      .delete("/deleteNote", {
        params: { noteID: id, boardID: params.board_id },
      })
      .then((res) => {
        console.log(res);
        if (success) {
          setMessage("Note deleted.");
          setMessageSeverity("success");
          setNoteAdded(!noteAdded);
        } else {
          setMessage("Note cannot be deleted.");
          setMessageSeverity("error");
        }
      })
      .catch((err) => {
        console.log("error deleting note: ", err);
        success = false;
      });
  };

  const handleSaveNote = () => {
    if (!validateData()) {
      return;
    }
    let newDate = new Date();

    // values.timestamp = parseInt(format(newDate, "T"));
    console.log(params.board_id);
    console.log(values);
    let success = true;

    const newNote: Note = {
      id: null,
      content: values.content,
      timestamp: parseInt(format(newDate, "T")),
      author: values.author,
    };

    axiosInstance
      .post("/createNote", newNote, { params: { boardID: params.board_id } })
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
        setValues({
          id: null,
          author: "Author",
          timestamp: 1000,
          content: "content",
        });
        setPopupState(false);
      })
      .catch((err) => {
        console.log("error adding note: ", err);
        success = false;
      });
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
                defaultValue={values.author}
                onChange={handleChange("author")}
                helperText={`${errors.name}`}
                error={errors.name != ""}
              />
              <Button onClick={() => setPopupState(false)}>
                <Typography variant="h5">X</Typography>
              </Button>
            </div>

            <TextField
              className="InputText"
              variant="outlined"
              value={values.content}
              onChange={handleChange("content")}
              focused
              align-items="left"
              id="description-text"
              rows="8"
              helperText={`${errors.content}`}
              multiline
              style={{ fontWeight: "bold", marginTop: "10px" }}
              error={errors.content !== ""}
            />

            <div className="saveDiv">
              <Button className="saveButton" onClick={handleSaveNote}>
                Save Note
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <a href={"/board/" + params.board_id}>
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
            <Box width={"70%"}>
              <Typography fontWeight={"bold"}>Note Title</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography fontWeight={"bold"}>Date Created</Typography>
            </Box>

            <Box width={"5%"}></Box>
            <Box width={"5%"}></Box>
          </Box>
          {notes.map((notes, idx) => {
            return (
              <Box key={idx} className="notesTableRow">
                <NoteRow
                  id={notes.id}
                  author={notes.author}
                  timestamp={notes.timestamp}
                  content={notes.content}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditNote}
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
