import { Budget } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import { getBudgetColPath, getBudgetDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the Budget object send in the request body and insert it into Firestore
 * under the path /budgets/writeResult.id
 */
export const createBudget = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "Budget", response) as Budget;
      if (!body) return;

      // get collection path to add to.
      const budgetColPath = getBudgetColPath(boardID);

      // add body to path
      const newBudgetDocRef = await createDoc(budgetColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newBudgetDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets one budget from firestore that matches the budgetID and boardID specified in
 * request query parameters.
 */
export const readBudget = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const budgetID = parseParam(request, "budgetID", response);

      // get firestore path
      const budgetDocPath = getBudgetDocPath(boardID, budgetID);

      // get the document
      const responseData = await readDoc(budgetDocPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets all budgets from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readBudgets = functions.https.onRequest(
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
      const budgetColPath = getBudgetColPath(boardID);

      // get the document
      const responseData = await readCol(budgetColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Updates the budget with budgetID in board with boardID.
 */
export const updateBudget = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const budgetID = parseParam(request, "budgetID", response);

      // get body
      const body = parseBodyAsType(request, "Budget", response) as Budget;
      if (!body) return;

      // get path
      const budgetPath = getBudgetDocPath(boardID, budgetID);

      //edit the budget (if found) and send a response message
      await updateDoc(budgetPath, body, response);

      sendJSON(response, null);
    });
  }
);

/**
 * Deletes the budget with budgetID in board with boardID.
 */
export const deleteBudget = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const budgetID = parseParam(request, "budgetID", response);

      // TODO: Check auth

      // get path
      const budgetPath = getBudgetDocPath(boardID, budgetID);

      //edit the budget (if found) and send a response message
      await deleteDoc(budgetPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
