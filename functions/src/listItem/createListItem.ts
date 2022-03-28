import { ListItem } from "../../../types";
import corsHandler from "../cors";
import { functions } from "../firebase";
import { createDoc, readDoc } from "../util/firestore/interactors";
import { getListItemColPath } from "../util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "../util/request";
import { sendJSON } from "../util/response";

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
