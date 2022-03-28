import { Board, Member } from "../../types";
import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import {
  createDoc,
  deleteDoc,
  readDoc,
  updateDoc,
} from "./util/firestore/interactors";
import {
  getBoardColPath,
  getBoardDocPath,
  getMemberColPath,
  getMemberDocPath,
} from "./util/firestore/paths";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON, sendUserFailure } from "./util/response";
// import { isUserAuthorized } from "./auth";

/**
 * Take the boards object send in the request body and insert it into Firestore
 * under the path /boards/writeResult.id
 */
export const createBoard = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      // TODO: Check auth

      // Read the body from the request.
      const body = parseBodyAsType(request, "Board", response) as Board;
      if (!body) return;

      // get collection path to add to.
      const boardColPath = getBoardColPath();

      // add body to path
      const newBoardDocRef = await createDoc(boardColPath, body, response);

      // send the response, that we have added the doc
      const responseData = await readDoc(newBoardDocRef.path, response);

      sendJSON(response, responseData);
    });
  }
);

/**
 * Gets all boards from firestore, under the path /boards, and returns it as a json
 * object in the response's body
 */
export const readBoardsByUserID = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // get userID from request query parameters
      const userID = parseParam(request, "userID", response);

      // const accessToken = request.get("Authorization")?.split(" ")[1];

      // isUserAuthorized(accessToken).then(res => {
      //   if(!res) {
      //     response.status(401).send("User is unauthorized");
      //   }
      // }).catch(err => {
      //   response.status(401).send("User is unauthorized");
      // })
      // TODO: Check auth

      // get firestore path
      // const boardColPath = getBoardColPath();

      // make the query
      const query = await admin
        .firestore()
        .collectionGroup("members")
        .where("userID", "==", userID);

      const snapshot = await query.get();

      // Send back a message that we've successfully written the message
      if (snapshot) {
        const result = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const boardData = await readDoc(doc.ref.path, response);
            return boardData;
          })
        );
        sendJSON(response, { boards: result });
      } else sendUserFailure(response, "Board Not Found");
    });
  }
);

export const readBoard = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);

      // get firestore path
      const boardColPath = getBoardDocPath(boardID);

      // get the document
      const responseData = await readDoc(boardColPath, response);

      // Send back a message that we've successfully written the message
      sendJSON(response, responseData);
    });
  }
);

export const updateBoard = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);

      // get body
      const body = parseBodyAsType(request, "Board", response) as Board;
      if (!body) return;

      // get path
      const boardPath = getBoardDocPath(boardID);

      //edit the board (if found) and send a response message
      await updateDoc(boardPath, body, response);

      sendJSON(response, null);
    });
  }
);

export const addUserToBoard = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "POST", response);

      // get query params
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

export const deleteUserFromBoard = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);
      const memberID = parseParam(request, "memberID", response);

      // get path
      const memberPath = getMemberDocPath(boardID, memberID);

      //edit the list (if found) and send a response message
      await deleteDoc(memberPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);

export const deleteBoard = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "DELETE", response);

      // get query params
      const boardID = parseParam(request, "boardID", response);

      // TODO: Check auth

      // get path
      const boardPath = getBoardDocPath(boardID);

      //edit the list (if found) and send a response message
      await deleteDoc(boardPath, response);

      // send success message
      sendJSON(response, null);
    });
  }
);

export const testingDeleteBoard = async (id: string) => {
  const snapshot = await admin.firestore().collection("boards").doc(String(id));

  if ((await snapshot.get()).exists) {
    snapshot.delete();
  }
};
