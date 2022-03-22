import React from "react";
import { useState } from "react";

import { Box, Button, Select, MenuItem, Typography, TextField } from "@mui/material";

interface Props {
  text: string;
  author: string;
  date: string;
  type: string;
}


export default function NoteRow({ text, author, date, type }: Props) {

  const [popupState, setPopupState] = useState(false);
  const [popupHeader, setPopupHeader] = useState("New Note")
  const [popupType, setPopupType] = useState("Note")


  const editPopup=()=>{
    setPopupState(true);
    

    if(type==='Note'){
      setPopupHeader("Edit Note")
      setPopupType("Note");
    }
    
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

            

        </div>
    </div>
      )
       : null}
      <Box className="notesTableRow tableCellsFormatting" width="50%" sx={{overflow: 'hidden'}}>
        <div style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow:'ellipsis', width: '95%'}}>
            {text}
        </div>

      </Box>
      <Box className="notesTableRow tableCellsFormatting" width="15%" sx={{overflow: 'hidden'}}>
        <Button className="openButton" style={{outline: '2px solid #68390D', margin:'auto', borderRadius: '0%', color: '#68390D', height:'80%'}}>Open</Button>
      </Box>
      <Box className="notesTableRow tableCellsFormatting" width="15%" sx={{overflow: 'hidden'}}>
        <div style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow:'ellipsis', width: '95%', textAlign: 'center'}}>
            {author}
        </div>
      </Box>

      <Box className="notesTableRow tableCellsFormatting" width="20%" sx={{overflow: 'hidden'}}>
        
      <div style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow:'ellipsis', width: '95%', textAlign: 'center'}}>
            {date}
        </div>
       
        
      </Box>
      
      
      <Box className="notesTableRow" width="5%">
        <Button sx={{color: '#68390D'}}>X</Button>
      </Box>
      <Box className="notesTableRow" width="5%">
        <Button sx={{ textDecoration: "underline", color: '#675443'}} onClick={()=>editPopup()}>edit</Button>
      </Box>
    </>
  );
}