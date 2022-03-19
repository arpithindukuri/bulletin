import corsHandler from "./cors";
import { functions } from "./firebase";
import { addList, getLists } from "./lists";
import { addListItem, getListItems } from "./listItem";
import { addNote, getNotes, getNote } from "./notes";
import { addExpense, getExpenses, getExpense } from "./expense";
import { addBoard, getBoards, getBoard } from "./board";
import { addEvent, getEvents, getEvent } from "./event";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  corsHandler(request, response, () => {
    // your function body here - use the provided req and res from cors
    // response.set("Access-Control-Allow-Origin", "https://bulletin-be82d.web.app");
    response.json({ response: "Hello from Firebase!" });
  });
});

export { addList, getLists, addNote, getNotes, getNote, addEvent, getEvents, getEvent, addListItem, getListItems,
  addExpense, getExpenses, getExpense, addBoard, getBoards, getBoard };
