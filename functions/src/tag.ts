import { Tag } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import { getTagColPath, getTagDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the Tag object send in the request body and insert it into Firestore
 * under the path /tags/writeResult.id
 */
export const createTag = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "Tag", response) as Tag;
      if (!body) return;

      // get collection path to add to.
      const tagColPath = getTagColPath(boardID);

      // add body to path
      const newTagDocRef = await createDoc(tagColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newTagDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets one tag from firestore that matches the tagID and boardID specified in
 * request query parameters.
 */
export const readTag = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // check HTTP method
    checkHTTPMethod(request, "GET", response);

    // TODO: Check auth

    // get query params
    const boardID = parseParam(request, "boardID", response);
    const tagID = parseParam(request, "tagID", response);

    // get firestore path
    const tagDocPath = getTagDocPath(boardID, tagID);

    // get the document
    const responseData = await readDoc(tagDocPath, response);

    // Send back a message that we've successfully written the message
    sendJSON(response, responseData);
  });
});

/**
 * Gets all tags from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readTags = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // check HTTP method
    checkHTTPMethod(request, "GET", response);

    // TODO: Check auth

    // get query params
    const boardID = parseParam(request, "boardID", response);

    // get firestore path
    const tagColPath = getTagColPath(boardID);

    // get the document
    const responseData = await readCol(tagColPath, response);

    // Send back a message that we've successfully written the message
    sendJSON(response, responseData);
  });
});

/**
 * Updates the tag with tagID in board with boardID.
 */
export const updateTag = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const tagID = parseParam(request, "tagID", response);

      // get body
      const body = parseBodyAsType(request, "Tag", response) as Tag;
      if (!body) return;

      // get path
      const tagPath = getTagDocPath(boardID, tagID);

      //edit the tag (if found) and send a response message
      await updateDoc(tagPath, body, response);

      sendJSON(response, null);
    });
  }
);

/**
 * Deletes the tag with tagID in board with boardID.
 */
export const deleteTag = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const tagID = parseParam(request, "tagID", response);

      // TODO: Check auth

      // get path
      const tagPath = getTagDocPath(boardID, tagID);

      //edit the tag (if found) and send a response message
      await deleteDoc(tagPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
