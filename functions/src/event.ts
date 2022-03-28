import { Event } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import { getEventColPath, getEventDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the Event object send in the request body and insert it into Firestore
 * under the path /events/writeResult.id
 */
export const createEvent = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "Event", response) as Event;
      if (!body) return;

      // get collection path to add to.
      const eventColPath = getEventColPath(boardID);

      // add body to path
      const newEventDocRef = await createDoc(eventColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newEventDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

export const readEvent = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const eventID = parseParam(request, "eventID", response);

      // get firestore path
      const eventDocPath = getEventDocPath(boardID, eventID);

      // get the document
      const responseData = await readDoc(eventDocPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets all events from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readEvents = functions.https.onRequest(
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
      const eventColPath = getEventColPath(boardID);

      // get the document
      const responseData = await readCol(eventColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

export const updateEvent = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const eventID = parseParam(request, "eventID", response);

      // get body
      const body = parseBodyAsType(request, "Event", response) as Event;
      if (!body) return;

      // get path
      const eventPath = getEventDocPath(boardID, eventID);

      //edit the event (if found) and send a response message
      await updateDoc(eventPath, body, response);

      sendJSON(response, null);
    });
  }
);

export const deleteEvent = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const eventID = parseParam(request, "eventID", response);

      // TODO: Check auth

      // get path
      const eventPath = getEventDocPath(boardID, eventID);

      //edit the event (if found) and send a response message
      await deleteDoc(eventPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
