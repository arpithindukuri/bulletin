import { List } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import { getListColPath, getListDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the List object send in the request body and insert it into Firestore
 * under the path /lists/writeResult.id
 */
export const createList = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "List", response) as List;
      if (!body) return;

      // get collection path to add to.
      const listColPath = getListColPath(boardID);

      // add body to path
      const newListDocRef = await createDoc(listColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newListDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets one list from firestore that matches the listID and boardID specified in
 * request query parameters.
 */
export const readList = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // check HTTP method
    checkHTTPMethod(request, "GET", response);

    // TODO: Check auth

    // get query params
    const boardID = parseParam(request, "boardID", response);
    const listID = parseParam(request, "listID", response);

    // get firestore path
    const listDocPath = getListDocPath(boardID, listID);

    // get the document
    const responseData = await readDoc(listDocPath, response);

    // Send back a message that we've successfully written the message
    sendJSON(response, responseData);
  });
});

/**
 * Gets all lists from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readLists = functions.https.onRequest(
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
      const listColPath = getListColPath(boardID);

      // get the document
      const responseData = await readCol(listColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Updates the list with listID in board with boardID.
 */
export const updateList = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const listID = parseParam(request, "listID", response);

      // get body
      const body = parseBodyAsType(request, "List", response) as List;
      if (!body) return;

      // get path
      const listPath = getListDocPath(boardID, listID);

      //edit the list (if found) and send a response message
      await updateDoc(listPath, body, response);

      sendJSON(response, null);
    });
  }
);

/**
 * Deletes the list with listID in board with boardID.
 */
export const deleteList = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const listID = parseParam(request, "listID", response);

      // TODO: Check auth

      // get path
      const listPath = getListDocPath(boardID, listID);

      //edit the list (if found) and send a response message
      await deleteDoc(listPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
