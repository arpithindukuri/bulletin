import React from "react";
import { useState } from "react";
import { Box, Button, Select, MenuItem, Typography, TextField } from "@mui/material";

interface Props {
  name: string;
  date: string;
  assigned: string;
  balance: number;
  type: string;
}

const mockMemberInfo = [
  { id: 1, name: "Liane Doe", email: "liane.doe@gmail.com", role: "Admin" },
  { id: 2, name: "Dad Doe", email: "dad.doe@gmail.com", role: "Admin" },
  { id: 3, name: "Logan Doe", email: "logan.doe@gmail.com", role: "Member" },
  { id: 4, name: "Aly Doe", email: "aly.doe@gmail.com", role: "Member" },
];

export default function ExpensesRow({ name, date, assigned, balance, type }: Props) {

  const [popupState, setPopupState] = useState(false);
  const [popupHeader, setPopupHeader] = useState("New Expense")
  const [popupType, setPopupType] = useState("Expense")
  const [popupDateType, setPopupDateType] = useState("Due")


  const editPopup=()=>{
    setPopupState(true);
    

    if(type==='Expense'){
      setPopupHeader("Edit Expense")
      setPopupType("Expense");
      setPopupDateType("End");
    } else {
      setPopupHeader("Edit Budget")
      setPopupType("Budget");
      setPopupDateType("Due");
    }
    
  }

  const editBudgetPopup=()=>{
    setPopupState(true);
    setPopupHeader("")
    setPopupType("");
    setPopupDateType("");

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
                    <Typography variant="h6">
                        {popupType} Name
                    </Typography>
                    <TextField variant='standard' defaultValue={name}/>
                </div>

                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        {popupDateType} Date
                    </Typography>
                    <TextField variant='standard' defaultValue={date} />
                </div>
                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        Assigned To
                    </Typography>
                    <Select
                      defaultValue={assigned}
                      sx={{width: "32%"}}>
                      {
                        mockMemberInfo.map((members)=> {
                          return (
                          <MenuItem key={members.id} value={members.name}>{members.name}</MenuItem>
                          )
                        })
                      }
                        
                    </Select>
                </div>
                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        Balance
                    </Typography>
                    <TextField variant="standard" defaultValue={"$" + balance.toFixed(2)}/>
                </div>
                <div className="saveDiv">
                    <Button className="saveButton" onClick={()=>setPopupState(false)}>
                        Save {popupType}
                    </Button>
                </div>
            </div>

        </div>
    </div>
      )
       : null}
      <Box className="expensesTableRow tableCellsFormatting" width="20%">
        {name}
      </Box>
      <Box className="expensesTableRow tableCellsFormatting" width="15%">
        {date}
      </Box>

      <Box className="expensesTableRow tableCellsFormatting" width="35%">
        {assigned}
      </Box>
      <Box className="expensesTableRow tableCellsFormatting" width="20%">
        ${balance.toFixed(2)}
      </Box>
      <Box className="expensesTableRow" width="5%">
        <Button>X</Button>
      </Box>
      <Box className="expensesTableRow" width="5%">
        <Button sx={{ textDecoration: "underline" }} onClick={()=>editPopup()}>edit</Button>
      </Box>
    </>
  );
}
