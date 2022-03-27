import corsHandler from "./cors";
import { functions } from "./firebase";
import { addList, getLists, editList, deleteList } from "./lists";
import {
  addListItem,
  getListItems,
  editListItem,
  deleteListItem,
} from "./listItem";
import { addNote, getNotes, getNote, editNote, deleteNote } from "./notes";
import {
  addExpense,
  getExpenses,
  getExpense,
  editExpense,
  deleteExpense,
} from "./expense";
import {
  addBudget,
  getBudgets,
  getBudget,
  editBudget,
  deleteBudget,
} from "./budget";
import {
  addBoard,
  getBoards,
  getBoard,
  editBoard,
  deleteBoard,
  addUserToBoard,
  deleteUserFromBoard,
  getBoardUsers,
  editUserFromBoard
} from "./board";
import { addEvent, getEvents, getEvent, editEvent, deleteEvent } from "./event";
import { addUser, getUser, editUser, getUserByEmail } from "./user";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  corsHandler(request, response, () => {
    // your function body here - use the provided req and res from cors
    // response.set("Access-Control-Allow-Origin", "https://bulletin-be82d.web.app");
    response.json({ response: "Hello from Firebase!" });
  });
});

export {
  addList,
  getLists,
  editList,
  deleteList,
  addNote,
  getNotes,
  getNote,
  editNote,
  deleteNote,
  addEvent,
  getEvents,
  getEvent,
  editEvent,
  deleteEvent,
  addListItem,
  getListItems,
  editListItem,
  deleteListItem,
  addExpense,
  getExpenses,
  getExpense,
  editExpense,
  deleteExpense,
  addBoard,
  getBoards,
  getBoard,
  editBoard,
  deleteBoard,
  addUserToBoard,
  deleteUserFromBoard,
  addBudget,
  getBudgets,
  getBudget,
  editBudget,
  deleteBudget,
  addUser,
  getUser,
  editUser,
  getBoardUsers,
  editUserFromBoard,
  getUserByEmail
};
