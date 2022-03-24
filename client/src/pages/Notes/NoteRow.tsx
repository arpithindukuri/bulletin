import {Box, Button, Typography, TextField} from "@mui/material"
import {useState} from 'react'
import React from 'react'

interface Props {
    name: string;
    date: string;
    tags: string [];
    content: string;
}


export default function NoteRow({name, date, tags, content}: Props) {
    const [popupEditState, setPopupEditState] = useState(false);
    const [popupOpenState, setPopupOpenState] = useState(false);

  return (
    <>
    {popupEditState ? (
         <div className="overlay" style={{paddingTop: "15%"}}>
         <div className="overlayBox">
           <div className="noteHeader">
             <Typography variant="h6">
               Note Name
             </Typography>
             <TextField  variant="standard" defaultValue={name}></TextField>
             <Button onClick={()=>setPopupEditState(false)}>
               <Typography variant="h5">
                   X
               </Typography>
             </Button>
           </div>
           <div className="noteContent">
               <textarea defaultValue={content}></textarea>
           </div>
           <div className="saveDiv">
                    <Button className="saveButton" onClick={()=>setPopupEditState(false)}>
                        Save Note
                    </Button>
           </div>
         </div>
     </div>
    ) : null}

    {popupOpenState ? (
            <div className="overlay" style={{paddingTop: "20%"}}>
                <div className="overlayBox">
                  <div className="noteHeader">
                    <Typography variant="h4">
                      {name}
                    </Typography>
                    <Button onClick={()=>setPopupOpenState(false)}>
                    <Typography variant="h5">
                        X
                    </Typography>
                    </Button>
                  </div>
                  <div className="noteContent">
                    {content}
                  </div>
                </div>
            </div>
        ) : null}

      <Box className="notesTableRow tableCellsFormatting noteNameCell" width="60%">
        <Box>
          {name}
        </Box>
        <Box>
          <Button variant="outlined" onClick={()=>setPopupOpenState(true)}>
            Open
          </Button>
        </Box>
      </Box>
      <Box className="notesTableRow tableCellsFormatting" width="20%">
        {date}
      </Box>
      <Box className="notesTableRow tableCellsFormatting" width={"10%"}>
          
          {tags.map(tag=>
          <Box className="tagBox">
              <Typography variant="subtitle2">
                  {tag}
              </Typography>
              </Box>
          )}
                    
          
      </Box>
      
      <Box className="notesTableRow" width="5%">
        <Button>X</Button>
      </Box>
      <Box className="notesTableRow" width="5%">
        <Button sx={{ textDecoration: "underline" }} onClick={()=>setPopupEditState(true)}>edit</Button>
      </Box> 
    </>
  )
}

