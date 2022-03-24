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

    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(body.id)
      .set(body);

    // Send back a message that we've successfully written the message
    if (snapshot) response.send(`User with ID: ${body.id} added.`);
  });
});

export const getUser = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    const user_id = request.query.user_id;
    if (!user_id) {
      response.status(400).send("Specify a user id");
    }

    // Get User from Firestore using the Firebase Admin SDK.
    const databaseUser = await admin
      .firestore()
      .collection("users")
      .doc(String(user_id))
      .get();
    if (!databaseUser.exists) {
      response.status(400).send("User Not Found");
    } else {
      response.json({ user: databaseUser.data() });
    }
  });
});

export const editUser = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "PUT")
      response.status(400).send("Bad method. Use PUT");

    const body = request.body;
    if (!body.id) {
      response.status(400).send("Specify a user id");
    }

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type Note
    if (!isUser(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    // TODO: Check auth

    // Get the note based on the request parameters
    const snapshot = await admin
      .firestore()
      .collection("users")
      .doc(String(body.id));

    // Edit the note (if found) and send back a response
    if ((await snapshot.get()).exists) {
      snapshot.set(body);
      response.status(200).send(`User with ID: ${body.id} is updated.`);
    } else response.status(400).send("User Not Found");
  });
});
export const getUserByEmail = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    const email = request.query.email;
    if (!email) {
      response.status(400).send("Specify a user email");
    }

    // Get User from Firestore using the Firebase Admin SDK.
    const databaseUser = await admin
      .firestore()
      .collection("users")
      .where('email', '==', email);
    if (!databaseUser) {
      response.status(400).send("User Not Found");
    } else {
      response.json({ user: (await databaseUser.get()).docs.map((doc)=>doc.data()) });
    }
  });
});