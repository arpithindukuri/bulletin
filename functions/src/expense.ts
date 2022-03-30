import { Expense } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import { getExpenseColPath, getExpenseDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the Expense object send in the request body and insert it into Firestore
 * under the path /expenses/writeResult.id
 */
export const createExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "Expense", response) as Expense;
      if (!body) return;

      // get collection path to add to.
      const expenseColPath = getExpenseColPath(boardID);

      // add body to path
      const newExpenseDocRef = await createDoc(expenseColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newExpenseDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

export const readExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const expenseID = parseParam(request, "expenseID", response);

      // get firestore path
      const expenseDocPath = getExpenseDocPath(boardID, expenseID);

      // get the document
      const responseData = await readDoc(expenseDocPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);
/**
 * Gets all expenses from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readExpenses = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const boardID = parseParam(request, "boardID", response);

      // get firestore path
      const expenseColPath = getExpenseColPath(boardID);

      // get the document
      const responseData = await readCol(expenseColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

export const updateExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const expenseID = parseParam(request, "expenseID", response);

      // get body
      const body = parseBodyAsType(request, "Expense", response) as Expense;
      if (!body) return;

      // get path
      const expensePath = getExpenseDocPath(boardID, expenseID);

      //edit the expense (if found) and send a response message
      await updateDoc(expensePath, body, response);

      sendJSON(response, null);
    });
  }
);

export const deleteExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const expenseID = parseParam(request, "expenseID", response);

      // TODO: Check auth

      // get path
      const expensePath = getExpenseDocPath(boardID, expenseID);

      //edit the expense (if found) and send a response message
      await deleteDoc(expensePath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
