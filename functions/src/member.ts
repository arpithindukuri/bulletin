import { Member } from "../../types";
import corsHandler from "./cors";
import { functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  updateDoc,
  readDoc,
  readCol,
} from "./util/firestore/interactors";
import { getMemberColPath, getMemberDocPath } from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON } from "./util/response";

/**
 * Take the Member object send in the request body and insert it into Firestore
 * under the path /members/writeResult.id
 */
export const createMember = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "Member", response) as Member;
      if (!body) return;

      // get collection path to add to.
      const memberColPath = getMemberColPath(boardID);

      // add body to path
      const newMemberDocRef = await createDoc(memberColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newMemberDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets one member from firestore that matches the memberID and boardID specified in
 * request query parameters.
 */
export const readMember = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // TODO: Check auth

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const memberID = parseParam(request, "memberID", response);

      // get firestore path
      const memberDocPath = getMemberDocPath(boardID, memberID);

      // get the document
      const responseData = await readDoc(memberDocPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets all members from firestore that matches the userID in the query,
 * and returns it as a json object in the response's body
 */
export const readMembers = functions.https.onRequest(
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
      const memberColPath = getMemberColPath(boardID);

      // get the document
      const responseData = await readCol(memberColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

/**
 * Updates the member with memberID in board with boardID.
 */
export const updateMember = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const memberID = parseParam(request, "memberID", response);

      // get body
      const body = parseBodyAsType(request, "Member", response) as Member;
      if (!body) return;

      // get path
      const memberPath = getMemberDocPath(boardID, memberID);

      //edit the member (if found) and send a response message
      await updateDoc(memberPath, body, response);

      sendJSON(response, null);
    });
  }
);

/**
 * Deletes the member with memberID in board with boardID.
 */
export const deleteMember = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const memberID = parseParam(request, "memberID", response);

      // TODO: Check auth

      // get path
      const memberPath = getMemberDocPath(boardID, memberID);

      //edit the member (if found) and send a response message
      await deleteDoc(memberPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);
