import { ListItem } from "../../../types";
import corsHandler from "../cors";
import { functions } from "../firebase";
import { updateDoc } from "../util/firestore/interactors";
import { getListItemDocPath } from "../util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "../util/request";
import { sendJSON } from "../util/response";

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
