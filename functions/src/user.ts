import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isUser } from "./typeguards/user";

/**
 * Take the event object send in the request body and insert it into Firestore
 * under the path
 */
 export const addUser = functions.https.onRequest(async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    corsHandler(request, response, async () => {
      // Check HTTP method
      if (request.method !== "POST")
        response.status(400).send("Bad method. Use POST");
  
      // Read the body from the request.
      const body = request.body;
  
      // Ensure the body has the necessary information
      // In this case, we check if the body is of type user
      if (!isUser(body)) {
        response.status(400).send("Bad body in request.");
        return;
      }
      
      const snapshot = await admin.firestore().collection('users').add(body);
      
      // Send back a message that we've successfully written the message
      if (snapshot)
        response.send(`User with ID: ${snapshot.id} added.`);
    });
  });