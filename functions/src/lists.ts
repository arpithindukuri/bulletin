import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isList } from "./typeguards";

/**
 * Gets all lists from firestore, under the path /lists, and returns it as a json
 * object in the response's body
 */
export const getLists = functions.https.onRequest(async (request, response) => {
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
    // TODO: Check auth
 
    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('lists').get();

    // Send back a message that we've successfully written the message
    if (snapshot)
      response.json({ lists: snapshot.docs.map((doc) => doc.data()) });
  });
});

/**
 * Take the List object send in the request body and insert it into Firestore
 * under the path /lists/writeResult.id
 */
export const addList = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // Check HTTP method
    if (request.method !== "POST")
      response.status(400).send("Bad method. Use POST");

      var board_id = request.query.id
      if(!board_id){
        response.status(400).send("Specify an id");
      }
      // TODO: Check auth
    // Read the body from the request.
    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type list
    if (!isList(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    //add list at board with board_id
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('lists').add(body);
    
    // Send back a message that we've successfully written the message
    if (snapshot)
      response.send(`Messageasdfg with ID: ${snapshot.id} added.`);
  });
});
export const deleteList = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "DELETE")
      response.status(400).send("Bad method. Use DELETE");

    const list_id = request.query.list_id
    if(!list_id){
      response.status(400).send("Specify a list id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth

    // Get the list based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('lists').doc(String(list_id));
    
    //delete the list (if found) and send a response message
    if ((await snapshot.get()).exists){
      snapshot.delete();
      response.status(400).send(`List with ID: ${list_id} is deleted.`);
    }else 
      response.status(400).send("List Not Found");
  });
});
export const editList = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "PUT")
      response.status(400).send("Bad method. Use PUT");

    const list_id = request.query.list_id
    if(!list_id){
      response.status(400).send("Specify a note id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }

    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type list
    if (!isList(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    // TODO: Check auth

    // Get the list based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('lists').doc(String(list_id));
    
    //edit the list (if found) and send a response message
    if ((await snapshot.get()).exists){
      snapshot.set(body);
      response.status(400).send(`List with ID: ${list_id} is updated.`);
    }else 
      response.status(400).send("List Not Found");
  });
});
