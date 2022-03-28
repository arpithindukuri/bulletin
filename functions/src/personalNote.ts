import { PersonalNote } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import {
  getPersonalNoteColPath,
  getPersonalNoteDocPath,
} from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the PersonalNote object send in the request body and insert it into Firestore
 * under the path /personalNotes/writeResult.id
 */
export const createPersonalNote = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const userID = parseParam(request, "userID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(
        request,
        "PersonalNote",
        response
      ) as PersonalNote;
      if (!body) return;

      // get collection path to add to.
      const personalNoteColPath = getPersonalNoteColPath(userID);

      // add body to path
      const newPersonalNoteDocRef = await createDoc(
        personalNoteColPath,
        body,
        response
      );

      // send the response, that we have added the doc
      const responseData = await readDoc(newPersonalNoteDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets one personalNote from firestore that matches the personalNoteID and userID specified in
 * request query parameters.
 */
export const readPersonalNote = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const userID = parseParam(request, "userID", response);
      const personalNoteID = parseParam(request, "personalNoteID", response);

      // get firestore path
      const personalNoteDocPath = getPersonalNoteDocPath(
        userID,
        personalNoteID
      );

      // get the document
      const responseData = await readDoc(personalNoteDocPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets all personalNotes from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readPersonalNotes = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const userID = parseParam(request, "userID", response);

      // get firestore path
      const personalNoteColPath = getPersonalNoteColPath(userID);

      // get the document
      const responseData = await readCol(personalNoteColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Updates the personalNote with personalNoteID in user with userID.
 */
export const updatePersonalNote = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const userID = parseParam(request, "userID", response);
      const personalNoteID = parseParam(request, "personalNoteID", response);

      // get body
      const body = parseBodyAsType(
        request,
        "PersonalNote",
        response
      ) as PersonalNote;
      if (!body) return;

      // get path
      const personalNotePath = getPersonalNoteDocPath(userID, personalNoteID);

      //edit the personalNote (if found) and send a response message
      await updateDoc(personalNotePath, body, response);

      sendJSON(response, null);
    });
  }
);

/**
 * Deletes the personalNote with personalNoteID in user with userID.
 */
export const deletePersonalNote = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const userID = parseParam(request, "userID", response);
      const personalNoteID = parseParam(request, "personalNoteID", response);

      // TODO: Check auth

      // get path
      const personalNotePath = getPersonalNoteDocPath(userID, personalNoteID);

      //edit the personalNote (if found) and send a response message
      await deleteDoc(personalNotePath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
