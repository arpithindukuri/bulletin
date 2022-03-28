import { PersonalReminder } from "../../types";
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
  getPersonalReminderColPath,
  getPersonalReminderDocPath,
} from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the PersonalReminder object send in the request body and insert it into Firestore
 * under the path /personalReminders/writeResult.id
 */
export const createPersonalReminder = functions.https.onRequest(
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
        "PersonalReminder",
        response
      ) as PersonalReminder;
      if (!body) return;

      // get collection path to add to.
      const personalReminderColPath = getPersonalReminderColPath(userID);

      // add body to path
      const newPersonalReminderDocRef = await createDoc(
        personalReminderColPath,
        body,
        response
      );

      // send the response, that we have added the doc
      const responseData = await readDoc(
        newPersonalReminderDocRef.path,
        response
      );

      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets one personalReminder from firestore that matches the personalReminderID and userID specified in
 * request query parameters.
 */
export const readPersonalReminder = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const userID = parseParam(request, "userID", response);
      const personalReminderID = parseParam(
        request,
        "personalReminderID",
        response
      );

      // get firestore path
      const personalReminderDocPath = getPersonalReminderDocPath(
        userID,
        personalReminderID
      );

      // get the document
      const responseData = await readDoc(personalReminderDocPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets all personalReminders from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readPersonalReminders = functions.https.onRequest(
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
      const personalReminderColPath = getPersonalReminderColPath(userID);

      // get the document
      const responseData = await readCol(personalReminderColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Updates the personalReminder with personalReminderID in user with userID.
 */
export const updatePersonalReminder = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const userID = parseParam(request, "userID", response);
      const personalReminderID = parseParam(
        request,
        "personalReminderID",
        response
      );

      // get body
      const body = parseBodyAsType(
        request,
        "PersonalReminder",
        response
      ) as PersonalReminder;
      if (!body) return;

      // get path
      const personalReminderPath = getPersonalReminderDocPath(
        userID,
        personalReminderID
      );

      //edit the personalReminder (if found) and send a response message
      await updateDoc(personalReminderPath, body, response);

      sendJSON(response, null);
    });
  }
);

/**
 * Deletes the personalReminder with personalReminderID in user with userID.
 */
export const deletePersonalReminder = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const userID = parseParam(request, "userID", response);
      const personalReminderID = parseParam(
        request,
        "personalReminderID",
        response
      );

      // TODO: Check auth

      // get path
      const personalReminderPath = getPersonalReminderDocPath(
        userID,
        personalReminderID
      );

      //edit the personalReminder (if found) and send a response message
      await deleteDoc(personalReminderPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
