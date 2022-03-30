import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createBudget,
  readBudget,
  readBudgets,
  updateBudget,
  deleteBudget,
} from "./budget";
import {
  createBoard,
  readBoardsByUserID,
  readBoard,
  updateBoard,
  deleteBoard,
  addUserToBoard,
  deleteUserFromBoard,
} from "./board";
import {
  createEvent,
  readEvent,
  readEvents,
  updateEvent,
  deleteEvent,
} from "./event";
import {
  createExpense,
  readExpense,
  readExpenses,
  updateExpense,
  deleteExpense,
} from "./expense";
import {
  createList,
  readList,
  readLists,
  updateList,
  deleteList,
} from "./list";
import {
  createListItem,
  readListItem,
  readListItems,
  updateListItem,
  deleteListItem,
} from "./listItem";
import {
  createMember,
  readMember,
  readMembers,
  updateMember,
  deleteMember,
} from "./member";
import {
  createNote,
  readNote,
  readNotes,
  updateNote,
  deleteNote,
} from "./notes";
import {
  createPersonalNote,
  readPersonalNote,
  readPersonalNotes,
  updatePersonalNote,
  deletePersonalNote,
} from "./personalNote";
import {
  createPersonalReminder,
  readPersonalReminder,
  readPersonalReminders,
  updatePersonalReminder,
  deletePersonalReminder,
} from "./personalReminder";
import { createTag, readTag, readTags, updateTag, deleteTag } from "./tag";
import { createUser, readUser, readUserByEmail, updateUser } from "./user";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  corsHandler(request, response, () => {
    // your function body here - use the provided req and res from cors
    // response.set("Access-Control-Allow-Origin", "https://bulletin-be82d.web.app");
    response.status(200).json({ response: "Hello from Firebase!" });
  });
});

export {
  createBoard,
  readBoardsByUserID,
  readBoard,
  updateBoard,
  deleteBoard,
  addUserToBoard,
  deleteUserFromBoard,
  createBudget,
  readBudget,
  readBudgets,
  updateBudget,
  deleteBudget,
  createEvent,
  readEvent,
  readEvents,
  updateEvent,
  deleteEvent,
  createExpense,
  readExpense,
  readExpenses,
  updateExpense,
  deleteExpense,
  createList,
  readList,
  readLists,
  updateList,
  deleteList,
  createListItem,
  readListItem,
  readListItems,
  updateListItem,
  deleteListItem,
  createMember,
  readMember,
  readMembers,
  updateMember,
  deleteMember,
  createNote,
  readNote,
  readNotes,
  updateNote,
  deleteNote,
  createPersonalNote,
  readPersonalNote,
  readPersonalNotes,
  updatePersonalNote,
  deletePersonalNote,
  createPersonalReminder,
  readPersonalReminder,
  readPersonalReminders,
  updatePersonalReminder,
  deletePersonalReminder,
  createTag,
  readTag,
  readTags,
  updateTag,
  deleteTag,
  createUser,
  readUser,
  updateUser,
  readUserByEmail,
};
