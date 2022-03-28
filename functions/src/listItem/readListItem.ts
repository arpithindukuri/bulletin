import corsHandler from "../cors";
import { functions } from "../firebase";
import { readDoc } from "../util/firestore/interactors";
import { getListItemDocPath } from "../util/firestore/paths";
import { checkHTTPMethod, parseParam } from "../util/request";
import { sendJSON } from "../util/response";

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
