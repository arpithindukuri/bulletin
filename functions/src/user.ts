import { User } from "../../types";
import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { readDoc, updateDoc } from "./util/firestore/interactors";
import { getUserColPath, getUserDocPath } from "./util/firestore/paths";
import { getColRef } from "./util/firestore/refs";
import { checkHTTPMethod, parseBodyAsType, parseParam } from "./util/request";
import { sendJSON, sendUserFailure } from "./util/response";

/**
 * Take the event object send in the request body and insert it into Firestore
 * under the path
 */
export const createUser = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    corsHandler(request, response, async () => {
      // Check HTTP method
      checkHTTPMethod(request, "POST", response);

      // Read the body from the request.
      const body = parseBodyAsType(request, "User", response) as User;
      if (!body) return;
      const { id, ...userData } = body;

      // get collection path to add to.
      const userColPath = getUserColPath();
      const userCol = getColRef(userColPath, response);

      // add body to path
      // const newUserDocRef = await createDoc(userColPath, body, response);
      await (await userCol).doc(id).create(userData);

      // send the response, that we have added the doc
      const responseData = await readDoc(`${userColPath}/${id}`, response);

      sendJSON(response, responseData);
    });
  }
);

export const readUser = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // check HTTP method
    checkHTTPMethod(request, "GET", response);

    // get query params
    const userID = parseParam(request, "userID", response);

    // get firestore path
    const userDocPath = getUserDocPath(userID);

    // get the document
    const responseData = await readDoc(userDocPath, response);

    // Send back a message that we've successfully written the message
    sendJSON(response, responseData);
  });
});

export const readUserByEmail = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "GET", response);

      const email = parseParam(request, "email", response);

      // get firestore path
      const userColPath = getUserColPath();

      // Get User from Firestore using the Firebase Admin SDK.
      const query = await admin
        .firestore()
        .collection(userColPath)
        .where("email", "==", email);

      const databaseUser = await readDoc(
        (
          await query.get()
        ).docs[0].ref.path,
        response
      );

      if (!databaseUser) {
        sendUserFailure(response, "User Not Found");
      } else {
        sendJSON(response, databaseUser);
      }
    });
  }
);

export const updateUser = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      // check HTTP method
      checkHTTPMethod(request, "PUT", response);

      // get query params
      const userID = parseParam(request, "userID", response);

      // get body
      const body = parseBodyAsType(request, "User", response) as User;
      if (!body) return;

      // TODO: Check auth

      // get path
      const userPath = getUserDocPath(userID);

      //edit the list (if found) and send a response message
      await updateDoc(userPath, body, response);

      sendJSON(response, null);
    });
  }
);
