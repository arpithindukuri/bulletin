import React from 'react';
import StyledMenu from "../components/StyledMenu";
import ShowCalendar from "../components/ShowCalendar";
import { Modal, Typography, Box, Button} from "@mui/material";
import "./Calendar.css";

const popUpMenu = () =>{
    window.open("/addevent","","toolbar=no,status=no,menubar=no,location=center,scrollbars=no,resizable=no,height=500,width=657");
 }
const Calendar = () => (
    <div>
      <a href="/home"><p>Back to Doe Family Board - Main</p></a>
        <div style={{
    position: "relative",
    float: "right",
    bottom: "10px",
    right: "300px"
    }}>
        <StyledMenu/>
        </div>
        <div style={{
    position: "relative",
    float: "right",
    bottom: "10px",
    right: "100px"
    }}>
        <Button style={{
             backgroundColor: "#AA896B",
             fontSize: "14px"
        }}variant="contained" onClick={()=>popUpMenu()}>+ Add Event</Button>
        </div>
        <ShowCalendar/>
    </div>
    
  );
  
  export default Calendar;