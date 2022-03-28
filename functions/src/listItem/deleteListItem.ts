import corsHandler from "../cors";
import { functions } from "../firebase";
import { deleteDoc } from "../util/firestore/interactors";
import { getListItemDocPath } from "../util/firestore/paths";
import { checkHTTPMethod, parseParam } from "../util/request";
import { sendJSON } from "../util/response";

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
