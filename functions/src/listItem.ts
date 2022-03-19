import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isListItem } from "./typeguards/listItem";

/**
 * Gets all listItems from firestore, under the path /listItems, and returns it as a json
 * object in the response's body
 */
export const getListItems = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    // TODO: Check auth
    var board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    var list_id = request.query.list_id
    if(!list_id){
      response.status(400).send("Specify a list id");
    }
    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('lists').doc(String(list_id)).collection('listItems').get();

    // Send back a message that we've successfully written the message
    if (snapshot)
      response.json({ listItems: snapshot.docs.map((doc) => doc.data()) });
  });
});

/**
 * Take the listItems object send in the request body and insert it into Firestore
 * under the path /listItems/writeResult.id
 */
export const addListItem = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  corsHandler(request, response, async () => {
    // Check HTTP method
    if (request.method !== "POST")
      response.status(400).send("Bad method. Use POST");

      var board_id = request.query.board_id
      if(!board_id){
        response.status(400).send("Specify a board id");
      }
      var list_id = request.query.list_id
      if(!list_id){
        response.status(400).send("Specify a list id");
      }
      // TODO: Check auth
    // Read the body from the request.
    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type
    if (!isListItem(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    //add note at board with board_id
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('lists').doc(String(list_id)).collection('listItems').add(body);
    
    // Send back a message that we've successfully written the message
    if (snapshot)
      response.send(`Messageasdfg with ID: ${snapshot.id} added.`);
  });
});
