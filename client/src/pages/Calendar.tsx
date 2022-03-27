import StyledMenu from "../components/StyledMenu";
import ShowCalendar from "../components/ShowCalendar";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent } from '@mui/material/Select';
import "./Calendar.css";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

 export default function Calendar () {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [textValue, setTextValue] = useState<string>("");
    const handleSave = () => setOpen(false);
    const [tags, setTag] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setTag(event.target.value as string);
    };
    
     return (
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
        }}variant="contained" onClick={handleOpen}>+ Add Event</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button style={{
             color: "#AA896B",
             backgroundColor: "#FFFFFF",
             fontSize: "14px",
             left:"600px"
        }}variant="text" disableElevation onClick={handleClose}>Discard</Button>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField id="standard-basic" label="Untitled" variant="standard" InputLabelProps={{
    style: { color: "#B8A590"},
  }} InputProps={{ disableUnderline: true }} fullWidth/>
  </div>
     <div>
     <TextField id="standard-basic" label="Date (Month, Day, Year)" variant="standard" InputLabelProps={{
    style: { color: "#675443"},
  }} InputProps={{ disableUnderline: true }} fullWidth/>
      </div>
      <div>
     <TextField id="standard-basic" label="Start Time(24 Hour Format)" variant="standard" InputLabelProps={{
    style: { color: "#675443"},
  }} InputProps={{ disableUnderline: true }} fullWidth/>
      </div>
      <div>
     <TextField id="standard-basic" label="End Time(24 Hour Format)" variant="standard" InputLabelProps={{
    style: { color: "#675443"},
  }} InputProps={{ disableUnderline: true }} fullWidth/>
      </div>
      <div>
      <TextField id="standard-basic" label="Add Description Here" variant="standard" InputLabelProps={{
    style: { color: "#675443"},
  }} InputProps={{ disableUnderline: true }} fullWidth/>
  </div>
  <div>
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Tags</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={tags}
    label="Tags"
    onChange={handleChange}
  >
    <MenuItem value={"appointments"}>Appointments</MenuItem>
    <MenuItem value={"birthdays"}>Birthdays</MenuItem>
    <MenuItem value={"work"}>Work</MenuItem>
    <MenuItem value={"family"}>Family</MenuItem>
    <MenuItem value={"school"}>School</MenuItem>
    <MenuItem value={"activties"}>Activties</MenuItem>
  </Select>
</FormControl>
  </div>
  <div>
  <Button style={{
             color: "#FFFFFF",
             backgroundColor: "#AA896B",
             fontSize: "14px",
             left:"600px",
             top: "110px"
        }}variant="text" disableElevation onClick={handleSave}>Save Event</Button>
  </div>
    </Box>
          </Typography>
        </Box>
      </Modal>
        </div>
        <ShowCalendar/>
    </div>
    
  );
}