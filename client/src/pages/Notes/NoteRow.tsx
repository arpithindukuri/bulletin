import { Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import { StringLiteralLike } from "typescript";

interface Props {
  id: string;
  name: string;
  date: string;
  content: string;
  onDelete: (arg0: string) => void;
  onEdit: (arg0: string, arg1: string, arg2: string, arg3: string) => void;
  popupOpen?: boolean;
}
interface NewState {
  name: string;
  content: string;
  date: string;
}

export default function NoteRow({
  name,
  date,
  content,
  id,
  onDelete,
  onEdit,
  popupOpen,
}: Props) {
  const [popupEditState, setPopupEditState] = useState(false);
  const [popupOpenState, setPopupOpenState] = useState(
    popupOpen !== undefined ? popupOpen : false
  );
  const [newValues, setNewValues] = React.useState<NewState>({
    name: name,
    content: content,
    date: date,
  });
  const handleChange =
    (prop: keyof NewState) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewValues({ ...newValues, [prop]: event.target.value });
    };
  const handleSave = () => {
    setPopupEditState(false);
    onEdit(id, newValues.name, newValues.content, newValues.date);
  };
  return (
    <>
      {popupEditState ? (
        <div className="overlay" style={{ paddingTop: "15%" }}>
          <div className="overlayBox">
            <div className="noteHeader">
              <Typography variant="h6">Note Name</Typography>
              <TextField
                id="edit-note-modal-name-field"
                variant="standard"
                onChange={handleChange("name")}
                value={newValues.name}
              ></TextField>
              <Button
                onClick={() => setPopupEditState(false)}
                id="close-note-edit-modal-button"
              >
                <Typography variant="h5">X</Typography>
              </Button>
            </div>
            <div className="noteContent">
              <textarea
                id="edit-note-modal-content-field"
                onChange={handleChange("content")}
                value={newValues.content}
              ></textarea>
            </div>
            <div className="saveDiv">
              <Button className="saveButton" onClick={handleSave}>
                Save Note
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {popupOpenState ? (
        <div className="overlay" style={{ paddingTop: "20%" }}>
          <div className="overlayBox">
            <div className="noteHeader">
              <Typography variant="h4">{name}</Typography>
              <Button onClick={() => setPopupOpenState(false)}>
                <Typography variant="h5">X</Typography>
              </Button>
            </div>
            <div className="noteContent">{content}</div>
          </div>
        </div>
      ) : null}

      <Box
        className="notesTableRow tableCellsFormatting noteNameCell"
        width="70%"
      >
        <Box>{name}</Box>
        <Box>
          <Button
            id="view-note-dialog-button"
            variant="outlined"
            onClick={() => setPopupOpenState(true)}
          >
            Open
          </Button>
        </Box>
      </Box>
      <Box className="notesTableRow tableCellsFormatting" width="20%">
        {date}
      </Box>

      <Box className="notesTableRow" width="5%">
        <Button onClick={() => onDelete(id)}>X</Button>
      </Box>
      <Box className="notesTableRow" width="5%">
        <Button
          id="edit-note-dialog-button"
          sx={{ textDecoration: "underline" }}
          onClick={() => setPopupEditState(true)}
        >
          edit
        </Button>
      </Box>
    </>
  );
}
