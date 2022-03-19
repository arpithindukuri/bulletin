import { Container, Typography, Box, Button } from "@mui/material";
import { render } from "@testing-library/react";
import React from "react";
import { useEffect, useState } from "react";
import "./Expenses.css";
import ExpensesRow from "./ExpensesRow";

interface Props {
  name: string;
}

var newExpense = false;

const addNewExpense =()=> {
    newExpense = true;
}

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

   const [newExpense, setNewExpense] = useState(false);

   
  return (
    <Container>

      {newExpense ? <Box className="addExpense"></Box> : null}

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
                ></ExpensesRow>
              </Box>
            );
          })}
          <Box className="expensesTableRow tableCellsFormatting addNewBox"  >
            <Button variant="text" fullWidth={true}>
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
          Bills & Expenses
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
                ></ExpensesRow>
              </Box>
            );
          })}
          <Box className="expensesTableRow tableCellsFormatting addNewBox"  >
            <Button variant="text" fullWidth={true}>
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
