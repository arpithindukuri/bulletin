import { Container, Typography, Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { render } from "@testing-library/react";
import React from "react";
import { useEffect, useState } from "react";
import "./Notes.css";
import NoteRow from "./NoteRow";
// import NoteOverlay from "./NoteOverlay"




function Notes() {
  
  var newNote = false;
  var openNote = false;
  
  const addNewNote =()=> {
      newNote = true;
  }
  
  const mockNotes = [
    {
      id: 1,
      text: "hi there hi there hi therehi therehi there hi there",
      author: "ahmed",
      date: '02/22/2022'
    },
    {
      id: 2,
      text: "Note2",
      author: "Dad Doe",
      date: '03/7/2021'
    },
    {
      id: 3,
      text: "Note3",
      author: "Dad Doe",
      date: '02/23/2012'
    }
  ];
   const [popupState, setPopupState] = useState(false);
   const [popupHeader, setPopupHeader] = useState("New Note")
   const [popupType, setPopupType] = useState("Note")
   const [popupTextPlaceholder] = useState("Text...")

    const [text, setText] = useState("");
    const handleTextChange = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      setText(event.target.value);
    };
  
   const newNotePopup=()=>{
     setPopupState(true);
     setPopupHeader("New Note");
     setPopupType("Note");
   }
   const saveNewNote=()=>{
     //send add note to backend
     setText("");
     
     setPopupState(false);
   }
  return (
    <>

      {popupState ? (
        <div className="overlay" style={{paddingTop: "15%"}}>
        <div className="overlayBox">
            <div className="overlayHeader">
            <Typography variant="h3">
                {popupHeader}
            </Typography>

            <Button onClick={()=>setPopupState(false)}>
              <Typography variant="h5">
                X
              </Typography>
              
            </Button>
            </div>

            <div className="overlayFields">
                <div className="overlayFieldRow">
                <textarea
                    rows={12}
                    cols={30}
                    style={{resize: 'none'}}
                    placeholder='Type to add a note...'
                    value={text}
                    onChange={handleTextChange}
                    className="text"
                  ></textarea>
                   
                 
                </div>

                
                <div className="saveDiv">
                    <Button className="saveButton" onClick={saveNewNote}>
                        Save {popupType}
                    </Button>
                </div>
            </div>

        </div>
    </div>
      )
       : null}
    <Container>
      <a href="/">
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="left"
          sx={{color: '#68390D'}}
        >
          Back to Main Board
        </Typography>
      </a>

      <Typography className="notesTitle" variant="h3">
        Notes
      </Typography>
      <Box className="notesTableRow tableCellsFormatting addNewBox" >
            <Button variant="text" fullWidth={true} onClick={()=>newNotePopup()}>
              <Typography>
                + Add New Note
              </Typography>
            </Button>
          </Box>
      <Box>

        <Box className="notesTable">
          <Box className="notesTableRow">
            <Box width={"50%"}>
              <Typography className="tableHeader" fontWeight={"bold"}>Note Text</Typography>
            </Box>
            <Box width={"15%"}>
              
            </Box>
            <Box width={"15%"}>
              <Typography className="tableHeader" fontWeight={"bold"}>Author</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography className="tableHeader" fontWeight={"bold"}>Date</Typography>
            </Box>
            <Box width={"5%"}></Box>
            <Box width={"5%"}></Box>
          </Box>
          {mockNotes.map((notes) => {
            return (
              <Box className="notesTableRow">
                <NoteRow
                  text={notes.text}
                  author={notes.author}
                  date={notes.date}
                  type={"Note"}
                ></NoteRow>
              </Box>
            );
          })}
          
          
        </Box>
      </Box>
      </Container>
    </>
  );
}
export default Notes;