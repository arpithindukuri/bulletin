import corsHandler from "../cors";
import { functions } from "../firebase";
import { readCol } from "../util/firestore/interactors";
import { getListItemColPath } from "../util/firestore/paths";
import { checkHTTPMethod, parseParam } from "../util/request";
import { sendJSON } from "../util/response";

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
