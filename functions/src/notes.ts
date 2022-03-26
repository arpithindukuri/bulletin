import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isNote } from "./typeguards/notes";

/**
 * Gets all notes from firestore, under the path /notes, and returns it as a json
 * object in the response's body
 */
export const getNotes = functions.https.onRequest(async (request, response) => {
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
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('notes').get();

    // Send back a message that we've successfully written the message
    if (snapshot)
      response.json({ notes: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))});
  });
});
export const getNote = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    const note_id = request.query.note_id
    if(!note_id){
      response.status(400).send("Specify a note id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('notes').get();
    const oneNote = snapshot.docs.filter((notes) => (notes.id === note_id))
    
    // Send back a message that we've successfully written the message
    if (oneNote)
      response.json({ Note: oneNote.map((doc) => doc.data()) });
    else 
      response.status(400).send("Note Not Found");
  });
});
/**
 * Take the note object send in the request body and insert it into Firestore
 * under the path /notes/writeResult.id
 */
 export const addNote = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  corsHandler(request, response, async () => {
    // Check HTTP method
    if (request.method !== "POST")
      response.status(400).send("Bad method. Use POST");

      const board_id = request.query.id
      if(!board_id){
        response.status(400).send("Specify an id");
      }
      // TODO: Check auth
    // Read the body from the request.
    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type note
    if (!isNote(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    //add note at board with board_id
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('notes').add(body);
    
    // Send back a message that we've successfully written the message
    if (snapshot)
      response.send(`Messageasdfg with ID: ${snapshot.id} added.`);
  });
});
export const deleteNote = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "DELETE")
      response.status(400).send("Bad method. Use DELETE");

    const note_id = request.query.note_id
    if(!note_id){
      response.status(400).send("Specify a note id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth

    // Get the note based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('notes').doc(String(note_id));
    
    // delete the note (if found) and send back a response
    if ((await snapshot.get()).exists){
      snapshot.delete();
      response.send(`Note with ID: ${note_id} is deleted.`);
    }
    else 
      response.status(400).send("Note Not Found");
  });
});
export const editNote = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "PUT")
      response.status(400).send("Bad method. Use PUT");

    const note_id = request.query.note_id
    if(!note_id){
      response.status(400).send("Specify a note id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }

    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type Note
    if (!isNote(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    // TODO: Check auth

   // Get the note based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('notes').doc(String(note_id));
    
    // Edit the note (if found) and send back a response
    if ((await snapshot.get()).exists){
      snapshot.set(body);
      response.send(`Note with ID: ${note_id} is updated.`);
    }else 
      response.status(400).send("Note Not Found");
  });
});