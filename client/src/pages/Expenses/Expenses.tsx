import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import "./Expenses.css";
import ExpensesRow from "./ExpensesRow";
import ExpensesOverlay from "./ExpensesOverlay";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import Budget from "../../models/Budget";
import Expense from "../../models/Expense";

export default function Expenses() {
  const params = useParams();
  const [boardName, setBoardName] = useState();
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [popupState, setPopupState] = useState(false);
  const [popupHeader, setPopupHeader] = useState("New Expense");
  const [popupType, setPopupType] = useState("Expense");
  const [popupDateType, setPopupDateType] = useState("Due");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    setExpensesTotal(0);

    expenses.map((expenses) => {
      setExpensesTotal((expensesTotal) => expensesTotal + expenses.amount);
    });
  }, [expenses]);

  useEffect(() => {
    setBudgetTotal(0);

    budgets.map((budget) => {
      setBudgetTotal((budgetTotal) => budgetTotal + budget.balance);
    });
  }, [budgets]);

  const newExpensePopup = () => {
    setPopupState(true);
    setPopupHeader("New Expense");
    setPopupType("Expense");
    setPopupDateType("Due");
  };

  const newBudgetPopup = () => {
    setPopupState(true);
    setPopupHeader("New Budget");
    setPopupType("Budget");
    setPopupDateType("End");
  };

  useEffect(() => {
    if (!params.board_id) {
      return;
    }

    axiosInstance
      .get("/getExpenses", { params: { id: params.board_id } })
      .then((res) => {
        console.log("expenses repsonse is: ", res);
        setExpenses([...res.data.expenses]);
      })
      .catch((err) => {
        console.log("error getting user expenses: ", err);
      });

    axiosInstance
      .get("/getBudgets", { params: { id: params.board_id } })
      .then((res) => {
        console.log("budgets repsonse is: ", res);
        setBudgets([...res.data.budgets]);
      })
      .catch((err) => {
        console.log("error getting user budgets: ", err);
      });
  }, [params.board_id]);

  useEffect(() => {
    axiosInstance
      .get("/getBoard", { params: { id: params.board_id } })
      .then((res) => {
        setBoardName(res.data.board.data.name);
        console.log("Information recieved Successfully");
      })
      .catch((err) => {
        console.log("error getting user boards: ", err);
      });
  }, [params.board_id]);

  return (
    <>
      {popupState ? (
        <ExpensesOverlay
          type={popupType}
          header={popupHeader}
          setExpenses={setExpenses}
          dateType={popupDateType}
          setPopupState={setPopupState}
          boardId={params.board_id}
          isEdit={false}
          setBudgets={setBudgets}
        />
      ) : null}
      <div style={{ marginLeft: "5%" }}>
        <a href={"/board/"+params.board_id}>
          <Typography
            variant="subtitle1"
            color="primary.light"
            align="left"
            sx={{ pt: "1vh" }}
          >
            Back to {boardName} Board - Main
          </Typography>
        </a>

        <Typography className="expensesTitle" variant="h3">
          Expenses
        </Typography>

        <Box>
          <Typography
            className="expensesSubtitles"
            fontWeight={"bold"}
            variant="h6"
          >
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
            {expenses.map((expense) => {
              return (
                <Box className="expensesTableRow">
                  <ExpensesRow
                    name={expense.name}
                    date={expense.deadline}
                    assigned={expense.assignee}
                    balance={expense.amount}
                    type={"Expense"}
                    boardId={params.board_id}
                    expenseId={expense.id}
                    setExpenses={setExpenses}
                    expenses={expenses}
                    budgets={budgets}
                    setBudgets={setBudgets}
                  ></ExpensesRow>
                </Box>
              );
            })}
            <Box className="expensesTableRow tableCellsFormatting addNewBox">
              <Button
                variant="text"
                fullWidth={true}
                onClick={() => newExpensePopup()}
              >
                <Typography>+ Add New Expense</Typography>
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
          <Typography
            className="expensesSubtitles"
            fontWeight={"bold"}
            variant="h6"
          >
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
            {budgets.map((budget) => {
              return (
                <Box className="expensesTableRow">
                  <ExpensesRow
                    name={budget.name}
                    date={budget.date}
                    assigned={budget.assigned}
                    balance={budget.balance}
                    type={"Budget"}
                    boardId={params.board_id}
                    expenseId={budget.id}
                    setExpenses={setExpenses}
                    expenses={expenses}
                    budgets={budgets}
                    setBudgets={setBudgets}
                  ></ExpensesRow>
                </Box>
              );
            })}
            <Box className="expensesTableRow tableCellsFormatting addNewBox">
              <Button
                variant="text"
                fullWidth={true}
                onClick={() => newBudgetPopup()}
              >
                <Typography>+ Add New Budget</Typography>
              </Button>
            </Box>
            <Box className="expensesTableRow calculateTotal">
              <Typography variant="h5">
                Total: ${budgetTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}
