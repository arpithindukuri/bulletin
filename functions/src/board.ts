import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isBoard } from "./typeguards/board";
import { isUserAuthorized } from "./auth";

/**
 * Gets all boards from firestore, under the path /boards, and returns it as a json
 * object in the response's body
 */
export const getBoards = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

      const accessToken = request.get("Authorization")?.split(" ")[1];

      isUserAuthorized(accessToken).then(res => {
        if(!res) {
          response.status(401).send("User is unauthorized");
        }
      }).catch(err => {
        response.status(401).send("User is unauthorized");
      })
    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection("boards").get();

    // Send back a message that we've successfully written the message
    if (snapshot)
      response.json({ boards: snapshot.docs.map((doc) => doc.data()) });
  });
});
export const getBoard = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    const id = request.query.id
    if(!id){
      response.status(400).send("Specify an id");
    }
    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection("boards").get();
    const oneBoard = snapshot.docs.filter((board) => (board.id === id))
    
    // Send back a message that we've successfully written the message
    if (oneBoard)
      response.json({ board: oneBoard.map((doc) => doc.data()) });
    else 
      response.status(400).send("Board Not Found");
  });
});

/**
 * Take the boards object send in the request body and insert it into Firestore
 * under the path /boards/writeResult.id
 */
export const addBoard = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  corsHandler(request, response, async () => {
    // Check HTTP method
    if (request.method !== "POST")
      response.status(400).send("Bad method. Use POST");

    // TODO: Check auth

    // Read the body from the request.
    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type
    if (!isBoard(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }

    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection("boards").add(body);

    // Send back a message that we've successfully written the message
    if (writeResult)
      response.send(`Messageasdfg with ID: ${writeResult.id} added.`);
  });
});
