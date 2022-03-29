import { Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import { Note } from "../../../../types";
import { format } from "date-fns";

interface Props extends Note {
  onDelete: (arg0: string) => void;
  onEdit: (arg0: string, arg1: string, arg2: string, arg3: number) => void;
}

export default function NoteRow({
  author,
  timestamp,
  content,
  id,
  onDelete,
  onEdit,
}: Props) {
  const [popupEditState, setPopupEditState] = useState(false);
  const [popupOpenState, setPopupOpenState] = useState(false);
  const [newValues, setNewValues] = React.useState<Note>({
    id,
    author,
    content,
    timestamp,
  });
  const handleChange =
    (prop: keyof Note) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewValues({ ...newValues, [prop]: event.target.value });
    };
  const handleSave = () => {
    setPopupEditState(false);
    onEdit(id || "", newValues.author, newValues.content, newValues.timestamp);
  };
  return (
    <>
      {popupEditState ? (
        <div className="overlay" style={{ paddingTop: "15%" }}>
          <div className="overlayBox">
            <div className="noteHeader">
              <Typography variant="h6">Note Name</Typography>
              <TextField
                variant="standard"
                defaultValue={author}
                onChange={handleChange("author")}
              ></TextField>
              <Button onClick={() => setPopupEditState(false)}>
                <Typography variant="h5">X</Typography>
              </Button>
            </div>
            <div className="noteContent">
              <textarea
                defaultValue={content}
                onChange={handleChange("content")}
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
              <Typography variant="h4">{author}</Typography>
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
        <Box>{author}</Box>
        <Box>
          <Button variant="outlined" onClick={() => setPopupOpenState(true)}>
            Open
          </Button>
        </Box>
      </Box>
      <Box className="notesTableRow tableCellsFormatting" width="20%">
        {format(timestamp, "LLL do, yyyy")}
      </Box>

      <Box className="notesTableRow" width="5%">
        <Button onClick={() => id && onDelete(id)}>X</Button>
      </Box>
      <Box className="notesTableRow" width="5%">
        <Button
          sx={{ textDecoration: "underline" }}
          onClick={() => setPopupEditState(true)}
        >
          edit
        </Button>
      </Box>
    </>
  );
}
