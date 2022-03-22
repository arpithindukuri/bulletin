import { TextField, Typography, Select, Button } from '@mui/material'
import React from 'react'
import "./ExpensesOverlay.css"

interface Props {
    header: string,
    type: string,
    nameField: string,
    dateType: string,
    balanceField: string,
}

export default function ExpensesOverlay({type, header, nameField, dateType, balanceField}: Props) {
  return (
    <div className="overlay">
        <div className="overlayBox">
            <Typography variant="h3">
                {header}
            </Typography>

            <div className="overlayFields">
                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        {type} Name
                    </Typography>
                    <TextField variant='standard' label={nameField} />
                </div>

                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        {dateType} Date
                    </Typography>
                    <TextField variant='standard' label={nameField} />
                </div>
                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        Assigned To
                    </Typography>
                    <Select>
                        
                    </Select>
                </div>
                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        Balance
                    </Typography>
                    <TextField variant="standard" label={balanceField}/>
                </div>
                <div className="saveDiv">
                    <Button className="saveButton">
                        Save {type}
                    </Button>
                </div>
            </div>

        </div>
    </div>
  )
}
