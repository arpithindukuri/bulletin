import { ListItem } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  readCol,
  readDoc,
  updateDoc,
} from "./util/firestore/interactors";
import { getListItemColPath, getListItemDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the listItems object send in the request body and insert it into Firestore
 * under the path /listItems/writeResult.id
 */
export const createListItem = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);
      const listID = parseParam(request, "listID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "ListItem", response) as ListItem;
      if (!body) return;

      // get collection path to add to.
      const listItemColPath = getListItemColPath(boardID, listID);

      // add body to path
      const newListItemDocRef = await createDoc(
        listItemColPath,
        body,
        response
      );

      // send the response, that we have added the doc
      const responseData = await readDoc(newListItemDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

export const readListItem = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth
      // get query params
      const boardID = parseParam(request, "boardID", response);
      const listID = parseParam(request, "listID", response);
      const listItemID = parseParam(request, "listItemID", response);

      // get firestore path
      const listItemDocPath = getListItemDocPath(boardID, listID, listItemID);

      // get the document
      const responseData = await readDoc(listItemDocPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets all listItems from firestore, under the path /listItems, and returns it as a json
 * object in the response's body
 */

export const readListItems = functions.https.onRequest(
  async (request, response) => {
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
      const listItemColPath = getListItemColPath(boardID, listID);

      // get the document
      const responseData = await readCol(listItemColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

export const deleteListItem = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const listID = parseParam(request, "listID", response);
      const listItemID = parseParam(request, "listItemID", response);

      // TODO: Check auth
      // get path
      const listItemPath = getListItemDocPath(boardID, listID, listItemID);

      //edit the list (if found) and send a response message
      await deleteDoc(listItemPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);

export const updateListItem = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const listID = parseParam(request, "listID", response);
      const listItemID = parseParam(request, "listItemID", response);

      // get body
      const body = parseBodyAsType(request, "ListItem", response) as ListItem;
      if (!body) return;

      // get path
      const listItemPath = getListItemDocPath(boardID, listID, listItemID);

      //edit the list (if found) and send a response message
      await updateDoc(listItemPath, body, response);

      sendJSON(response, null);
    });
  }
);
