import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isExpense } from "./typeguards/expenses";

/**
 * Gets all expenses from firestore, under the path /expenses, and returns it as a json
 * object in the response's body
 */
export const getExpense = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection("expenses").get();

    // Send back a message that we've successfully written the message
    if (snapshot)
      response.json({ expenses: snapshot.docs.map((doc) => doc.data()) });
  });
});

/**
 * Take the expenses object send in the request body and insert it into Firestore
 * under the path /expenses/writeResult.id
 */
export const addExpense = functions.https.onRequest(async (request, response) => {
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
    if (!isExpense(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }

    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection("expenses").add(body);

    // Send back a message that we've successfully written the message
    if (writeResult)
      response.send(`Messageasdfg with ID: ${writeResult.id} added.`);
  });
});
