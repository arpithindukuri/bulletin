import {
  TextField,
  Typography,
  Select,
  Button,
  Modal,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { format } from "date-fns";
import { Budget, Expense } from "../../../../types";
import axiosInstance from "../../axios";

interface Props {
  header: string;
  type: string;
  dateType: string;
  setPopupState: React.Dispatch<React.SetStateAction<boolean>>;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  boardId: string | undefined;
  isEdit: boolean;
  defaultName?: string;
  defaultDate?: number;
  defaultAssignee?: string;
  defaultAmount?: number;
  expenseId?: string;
}

interface AddExpenseErrors {
  name: string;
  date: string;
  assignee: string;
  amount: string;
}

export default function ExpensesOverlay({
  type,
  header,
  dateType,
  setPopupState,
  boardId,
  defaultName,
  defaultDate,
  defaultAssignee,
  defaultAmount,
  isEdit,
  expenseId,
  setExpenses,
  setBudgets,
}: Props) {
  const [popupName, setPopupName] = useState(defaultName ? defaultName : "");
  const [popupBalance, setPopupBalance] = useState(
    defaultAmount ? defaultAmount.toString() : ""
  );
  const [popupAssignee, setPopupAssignee] = useState(
    defaultAssignee ? defaultAssignee : ""
  );
  const [popupDate, setPopupDate] = useState(
    defaultDate ? format(defaultDate, "dd/MM/YYYY") : ""
  );

  const getExpenses = () => {
    axiosInstance
      .get("/readExpenses", { params: { boardID: boardId } })
      .then((res) => {
        console.log("expenses repsonse is: ", res);
        setExpenses([...res.data.content]);
      })
      .catch((err) => {
        console.log("error getting user expenses: ", err);
      });
  };

  const getBudgets = () => {
    axiosInstance
      .get("/readBudgets", { params: { boardID: boardId } })
      .then((res) => {
        console.log("budgets repsonse is: ", res);
        setBudgets([...res.data.content]);
      })
      .catch((err) => {
        console.log("error getting user budgets: ", err);
      });
  };

  const validateData = () => {
    errors.name = "";
    errors.date = "";
    errors.assignee = "";
    errors.amount = "";

    let errorsExits = false;

    if (!popupName) {
      errors.name = "Please enter a name.";
      errorsExits = true;
    }

    if (!popupDate) {
      errors.date = "Please enter a date";
      errorsExits = true;
    } else if (!isValidDate(popupDate)) {
      errors.date = "Please enter a valid date";
      errorsExits = true;
    }

    if (!popupAssignee) {
      errors.assignee = "Please select an assignee.";
      errorsExits = true;
    }

    if (!popupBalance) {
      errors.amount = "Please enter an amount.";
      errorsExits = true;
    } else if (isNaN(parseFloat(popupBalance))) {
      errors.amount = "Please enter a valid number.";
      errorsExits = true;
    }

    setErrors({ ...errors });
    return !errorsExits;
  };

  const [errors, setErrors] = useState<AddExpenseErrors>({
    name: "",
    date: "",
    assignee: "",
    amount: "",
  });

  const handleNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPopupName(event.target.value);
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPopupDate(event.target.value);
  };

  const handleAssigneeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPopupAssignee(event.target.value);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPopupBalance(event.target.value);
  };

  const isValidDate = (date: string) => {
    if (!date.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
      return false;
    }
    return true;
  };

  const handleAddExpense = () => {
    if (!validateData()) {
      return;
    }

    const values: Expense = {
      name: popupName,
      dueDate: parseInt(popupDate),
      amount: parseFloat(popupBalance),
      assignedUserID: popupAssignee,
      balance: -parseFloat(popupBalance),
      id: null,
    };

    axiosInstance
      .post("/createExpense", values, { params: { boardID: boardId } })
      .then((res) => {
        console.log(res);
        getExpenses();
        setPopupState(false);
      })
      .catch((err) => {
        console.log("error adding expense: ", err);
      });
  };

  const handleEditExpense = () => {
    if (!validateData()) {
      return;
    }

    const values: Expense = {
      name: popupName,
      dueDate: parseInt(popupDate),
      amount: parseFloat(popupBalance),
      balance: -parseFloat(popupBalance),
      assignedUserID: popupAssignee,
      id: expenseId || "",
    };

    axiosInstance
      .put("/updateExpense", values, {
        params: { boardID: boardId, expenseID: expenseId },
      })
      .then((res) => {
        getExpenses();
        setPopupState(false);
      })
      .catch((err) => {
        console.log("error editing expense: ", err);
      });
  };

  const handleAddBudget = () => {
    if (!validateData()) {
      return;
    }

    const values: Budget = {
      name: popupName,
      endDate: parseInt(popupDate),
      amount: parseFloat(popupBalance),
      balance: -parseFloat(popupBalance),
      assignedUserID: popupAssignee,
      id: null,
    };

    axiosInstance
      .post("/createBudget", values, { params: { boardID: boardId } })
      .then((res) => {
        console.log(res);
        getBudgets();
        setPopupState(false);
      })
      .catch((err) => {
        console.log("error adding budget: ", err);
      });
  };

  const handleEditBudget = () => {
    if (!validateData()) {
      return;
    }

    const values: Expense = {
      id: expenseId || "",
      name: popupName,
      dueDate: parseInt(popupDate),
      balance: -parseFloat(popupBalance),
      amount: parseFloat(popupBalance),
      assignedUserID: popupAssignee,
    };

    axiosInstance
      .put("/updateBudget", values, {
        params: { boardID: boardId, budgetID: expenseId },
      })
      .then((res) => {
        console.log(res);
        getBudgets();
        setPopupState(false);
      })
      .catch((err) => {
        console.log("error editing budget: ", err);
      });
  };

  return (
    <Modal
      open={true}
      onClose={() => setPopupState(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="overlayBox">
        <div className="overlayHeader">
          <Typography variant="h3">{header}</Typography>

          <Button onClick={() => setPopupState(false)}>
            <Typography variant="h5">X</Typography>
          </Button>
        </div>

        <div className="overlayFields">
          <div className="overlayFieldRow">
            <Typography variant="h6">{type} Name</Typography>
            <TextField
              variant="standard"
              label={popupName ? "" : `Add ${type} Name`}
              value={popupName}
              onChange={handleNameChange}
              error={errors.name != ""}
              helperText={errors.name}
            />
          </div>

          <div className="overlayFieldRow">
            <Typography variant="h6">{dateType} Date</Typography>
            <TextField
              variant="standard"
              label={popupDate ? "" : "Add Date (YYYY-MM-DD)"}
              value={popupDate}
              onChange={handleDateChange}
              error={errors.date != ""}
              helperText={errors.date}
            />
          </div>
          <div className="overlayFieldRow">
            <Typography variant="h6">Assigned To</Typography>
            <TextField
              variant="standard"
              label={popupAssignee ? "" : "Assign To"}
              value={popupAssignee}
              onChange={handleAssigneeChange}
              error={errors.assignee != ""}
              helperText={errors.assignee}
            />
          </div>
          <div className="overlayFieldRow">
            <Typography variant="h6">Balance($)</Typography>
            <TextField
              variant="standard"
              label={popupBalance ? "" : "Add Balance ($)"}
              value={popupBalance}
              onChange={handleAmountChange}
              error={errors.amount != ""}
              helperText={errors.amount}
            />
          </div>
          <div className="saveDiv">
            <Button
              className="saveButton"
              onClick={
                type == "Expense"
                  ? isEdit
                    ? handleEditExpense
                    : handleAddExpense
                  : isEdit
                  ? handleEditBudget
                  : handleAddBudget
              }
            >
              Save {type}
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
