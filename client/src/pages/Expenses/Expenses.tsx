import { Container, Typography, Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { render } from "@testing-library/react";
import React from "react";
import { useEffect, useState } from "react";
import "./Expenses.css";
import ExpensesRow from "./ExpensesRow";
import ExpensesOverlay from "./ExpensesOverlay"

interface Props {
  name: string;
}

var newExpense = false;

const addNewExpense =()=> {
    newExpense = true;
}

const mockMemberInfo = [
  { id: 1, name: "Liane Doe", email: "liane.doe@gmail.com", role: "Admin" },
  { id: 2, name: "Dad Doe", email: "dad.doe@gmail.com", role: "Admin" },
  { id: 3, name: "Logan Doe", email: "logan.doe@gmail.com", role: "Member" },
  { id: 4, name: "Aly Doe", email: "aly.doe@gmail.com", role: "Member" },
];

export default function Expenses({ name }: Props) {
  const mockExpenses = [
    {
      id: 1,
      name: "Rent",
      date: "01/03/22",
      assigned: "Liane Doe",
      balance: 2000.00,
    },
    {
      id: 2,
      name: "Water Bill",
      date: "09/03/22",
      assigned: "Dad Doe",
      balance: 80.00,
    },
    {
      id: 3,
      name: "Electric Bill",
      date: "12/03/22",
      assigned: "Dad Doe",
      balance: 200.00,
    },
    {
      id: 4,
      name: "Internet Bill",
      date: "20/03/22",
      assigned: "Dad Doe",
      balance: 80.00,
    },
    {
      id: 5,
      name: "Car Insurance",
      date: "12/03/22",
      assigned: "Aly Doe",
      balance: 150.00,
    },
  ];

  const mockBudgets = [
    {
      id: 1,
      name: "Groceries",
      date: "07/03/22",
      assigned: "Dad Doe",
      balance: 300.00,
    },
    {
      id: 2,
      name: "Vacation",
      date: "20/08/22",
      assigned: "Dad Doe",
      balance: 2500.00,
    },
    {
      id: 3,
      name: "Vacation",
      date: "20/08/22",
      assigned: "Liane Doe",
      balance: 2500.00,
    },
  ];

  const [expensesTotal, setExpensesTotal] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState(0);

  useEffect(() => {
    mockExpenses.map((expenses)=>{
      setExpensesTotal( (expensesTotal) => expensesTotal + expenses.balance);
    })
   }, []);
    
   useEffect(() => {
    mockBudgets.map((budget)=>{
      setBudgetTotal( (budgetTotal) => budgetTotal + budget.balance);
    })
   }, []);

   const [popupState, setPopupState] = useState(false);
   const [popupHeader, setPopupHeader] = useState("New Expense")
   const [popupType, setPopupType] = useState("Expense")
   const [popupName, setPopupName] = useState("Add Expense Name...")
   const [popupDateType, setPopupDateType] = useState("Due")
   const [popupBalance, setPopupBalance] = useState("$0.00")
   const [popupAssignee, setPopupAssignee] = useState("Assign To...")

   const newExpensePopup=()=>{
     setPopupState(true);
     setPopupHeader("New Expense");
     setPopupType("Expense");
     setPopupName("Add Expense Name...")
     setPopupDateType("Due");
     setPopupBalance("$0.00");
     setPopupAssignee("Assign To...")
   }

   const newBudgetPopup=()=>{
    setPopupState(true);
    setPopupHeader("New Budget")
    setPopupType("Budget");
    setPopupName("Add Budget Name...")
    setPopupDateType("End");
    setPopupBalance("$0.00");
    setPopupAssignee("Assign To...")
  }
   
  return (
    <Container>

      {popupState ? (
        <div className="overlay">
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
                    <TextField variant='standard' defaultValue={popupName}/>
                </div>

                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        {popupDateType} Date
                    </Typography>
                    <TextField variant='standard' defaultValue={"Add Date..."} />
                </div>
                <div className="overlayFieldRow">
                    <Typography variant="h6">
                        Assigned To
                    </Typography>
                    <Select

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
                    <TextField variant="standard" defaultValue={popupBalance}/>
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

      <a href="/">
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="left"
          sx={{ pt: "1vh" }}
        >
          Back to {name} Board - Main
        </Typography>
      </a>

      <Typography className="expensesTitle" variant="h3">
        Expenses
      </Typography>

      <Box>
        <Typography className="expensesSubtitles" fontWeight={"bold"} variant="h6">
          Bills & Expenses
        </Typography>

        <Box className="expensesTable">
          <Box className="expensesTableRow">
            <Box width={"20%"}>
              <Typography fontWeight={"bold"}>Expenses Name</Typography>
            </Box>
            <Box width={"15%"}>
              <Typography fontWeight={"bold"}>Due Date</Typography>
            </Box>
            <Box width={"35%"}>
              <Typography fontWeight={"bold"}>Assigned To</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography fontWeight={"bold"}>Balance</Typography>
            </Box>
            <Box width={"5%"}></Box>
            <Box width={"5%"}></Box>
          </Box>
          {mockExpenses.map((expenses) => {
            return (
              <Box className="expensesTableRow">
                <ExpensesRow
                  name={expenses.name}
                  date={expenses.date}
                  assigned={expenses.assigned}
                  balance={expenses.balance}
                  type={"Expense"}
                ></ExpensesRow>
              </Box>
            );
          })}
          <Box className="expensesTableRow tableCellsFormatting addNewBox"  >
            <Button variant="text" fullWidth={true} onClick={()=>newExpensePopup()}>
              <Typography>
                + Add New Expense
              </Typography>
            </Button>
          </Box>
          <Box className="expensesTableRow calculateTotal">
            <Typography variant="h5">
              Total: ${expensesTotal.toFixed(2)}
            </Typography> 
          </Box>
        </Box>
      </Box>


      <Box>
        <Typography className="expensesSubtitles" fontWeight={"bold"} variant="h6">
          Budgets
        </Typography>

        <Box className="expensesTable">
          <Box className="expensesTableRow">
            <Box width={"20%"}>
              <Typography fontWeight={"bold"}>Budget Name</Typography>
            </Box>
            <Box width={"15%"}>
              <Typography fontWeight={"bold"}>End Date</Typography>
            </Box>
            <Box width={"35%"}>
              <Typography fontWeight={"bold"}>Assigned To</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography fontWeight={"bold"}>Balance</Typography>
            </Box>
            <Box width={"5%"}></Box>
            <Box width={"5%"}></Box>
          </Box>
          {mockBudgets.map((budget) => {
            return (
              <Box className="expensesTableRow">
                <ExpensesRow
                  name={budget.name}
                  date={budget.date}
                  assigned={budget.assigned}
                  balance={budget.balance}
                  type={"Budget"}
                ></ExpensesRow>
              </Box>
            );
          })}
          <Box className="expensesTableRow tableCellsFormatting addNewBox"  >
            <Button variant="text" fullWidth={true} onClick={()=>newBudgetPopup()}>
              <Typography>
                + Add New Budget
              </Typography>
            </Button>
          </Box>
          <Box className="expensesTableRow calculateTotal">
            <Typography variant="h5">
              Total: ${budgetTotal.toFixed(2)}
            </Typography> 
          </Box>
        </Box>
      </Box>

        

    </Container>
  );
}
