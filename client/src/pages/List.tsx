import React from 'react';
import StyledMenu from "../components/StyledMenu";
import Button from '@mui/material/Button';
import "./Calendar.css";
function popUpMenu(){
    alert('The menu should pop up');
 }
const List = () => (
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
        }}variant="contained" onClick={popUpMenu}>Sort</Button>
        </div>
    </div>
    
  );
  
  export default List;