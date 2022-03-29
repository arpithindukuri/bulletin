import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import ExpensesOverlay from "./ExpensesOverlay";
import axiosInstance from "../../axios";
import { Budget, Expense } from "../../../../types";

interface Props {
  name: string;
  date: number;
  assigned: string;
  balance: number;
  type: string;
  boardId: string | undefined;
  expenseId: string;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  expenses: Array<Expense>;
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  budgets: Array<Budget>;
}

export default function ExpensesRow({
  name,
  date,
  assigned,
  balance,
  type,
  boardId,
  expenseId,
  setExpenses,
  expenses,
  budgets,
  setBudgets,
}: Props) {
  const [popupState, setPopupState] = useState(false);
  const [popupHeader, setPopupHeader] = useState("New Expense");
  const [popupType, setPopupType] = useState("Expense");
  const [popupDateType, setPopupDateType] = useState("Due");

  const editPopup = () => {
    setPopupState(true);

    if (type === "Expense") {
      setPopupHeader("Edit Expense");
      setPopupType("Expense");
      setPopupDateType("End");
    } else {
      setPopupHeader("Edit Budget");
      setPopupType("Budget");
      setPopupDateType("Due");
    }
  };

  const handleDelete = () => {
    if (type === "Expense") {
      axiosInstance
        .delete("/deleteExpense", {
          params: { boardID: boardId, expenseID: expenseId },
        })
        .then((res) => {
          console.log("delete expense response is: ", res);
          const index = expenses.findIndex((x: Expense) => x.id === expenseId);
          if (index > -1) {
            expenses.splice(index, 1);
            setExpenses([...expenses]);
          }
        });
    } else {
      axiosInstance
        .delete("/deleteBudget", {
          params: { boardID: boardId, budgetID: expenseId },
        })
        .then((res) => {
          console.log("delete budget response is: ", res);
          const index = budgets.findIndex((x: Budget) => x.id === expenseId);
          if (index > -1) {
            budgets.splice(index, 1);
            setBudgets([...budgets]);
          }
        });
    }
  };

  return (
    <>
      {popupState ? (
        <div style={{ marginLeft: "-10%", marginTop: "-35%" }}>
          <ExpensesOverlay
            type={popupType}
            header={popupHeader}
            setExpenses={setExpenses}
            dateType={popupDateType}
            setPopupState={setPopupState}
            boardId={boardId}
            defaultName={name}
            defaultDate={date}
            defaultAssignee={assigned}
            defaultAmount={balance}
            isEdit={true}
            expenseId={expenseId}
            setBudgets={setBudgets}
          />
        </div>
      ) : null}
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
        <Button onClick={handleDelete}>X</Button>
      </Box>
      <Box className="expensesTableRow" width="5%">
        <Button
          sx={{ textDecoration: "underline" }}
          onClick={() => editPopup()}
        >
          edit
        </Button>
      </Box>
    </>
  );
}
