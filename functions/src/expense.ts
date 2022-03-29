import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isExpense } from "./typeguards/expense";

/**
 * Gets all expenses from firestore, under the path /expenses, and returns it as a json
 * object in the response's body
 */
export const getExpenses = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      if (request.method !== "GET")
        response.status(400).send("Bad method. Use GET");

      // TODO: Check auth
      var board_id = request.query.id;
      if (!board_id) {
        response.status(400).send("Specify a board id");
      }
      // TODO: Check auth

      // Push the new message into Firestore using the Firebase Admin SDK.
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("expenses")
        .get();

      // Send back a message that we've successfully written the message
      if (snapshot)
        response.status(200).json({
          expenses: snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          }),
        });
    });
  }
);
export const getExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      if (request.method !== "GET")
        response.status(400).send("Bad method. Use GET");

      const expense_id = request.query.expense_id;
      if (!expense_id) {
        response.status(400).send("Specify an event id");
      }
      const board_id = request.query.board_id;
      if (!board_id) {
        response.status(400).send("Specify a board id");
      }
      // TODO: Check auth

      // Push the new message into Firestore using the Firebase Admin SDK.
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("expenses")
        .get();
      const oneExpense = snapshot.docs.filter(
        (expenses) => expenses.id === expense_id
      );

      // Send back a message that we've successfully written the message
      if (oneExpense)
        response.json({ Expense: oneExpense.map((doc) => doc.data()) });
      else response.status(400).send("Expense Not Found");
    });
  }
);
/**
 * Take the expenses object send in the request body and insert it into Firestore
 * under the path /expenses/writeResult.id
 */
export const addExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    corsHandler(request, response, async () => {
      // Check HTTP method
      if (request.method !== "POST")
        response.status(400).send("Bad method. Use POST");

      var board_id = request.query.id;
      if (!board_id) {
        response.status(400).send("Specify an id");
      }
      // TODO: Check auth
      // Read the body from the request.
      const body = request.body;

      // Ensure the body has the necessary information
      // In this case, we check if the body is of type expense
      if (!isExpense(body)) {
        response.status(400).send("Bad body in request.");
        return;
      }
      //add note at board with board_id
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("expenses")
        .add(body);

      // Send back a message that we've successfully written the message
      if (snapshot)
        response.status(201).json({id: snapshot.id});
    });
  }
);
export const deleteExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      if (request.method !== "DELETE")
        response.status(400).send("Bad method. Use DELETE");

      const expense_id = request.query.expense_id;
      if (!expense_id) {
        response.status(400).send("Specify an expense id");
      }
      const board_id = request.query.board_id;
      if (!board_id) {
        response.status(400).send("Specify a board id");
      }
      // TODO: Check auth

      // Get the expense based on the request parameters
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("expenses")
        .doc(String(expense_id));

      //delete the expense (if found) and send a response message
      if ((await snapshot.get()).exists) {
        snapshot.delete();
        response.status(202).send(`Event with ID: ${expense_id} is deleted.`);
      } else response.status(400).send("Event Not Found");
    });
  }
);
export const editExpense = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      if (request.method !== "PUT")
        response.status(400).send("Bad method. Use PUT");

      const expense_id = request.query.expense_id;
      if (!expense_id) {
        response.status(400).send("Specify an expense id");
      }
      const board_id = request.query.board_id;
      if (!board_id) {
        response.status(400).send("Specify a board id");
      }

      const body = request.body;

      // Ensure the body has the necessary information
      // In this case, we check if the body is of type
      if (!isExpense(body)) {
        response.status(400).send("Bad body in request.");
        return;
      }
      // TODO: Check auth

      // Get the expense based on the request parameters
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("expenses")
        .doc(String(expense_id));

      //edit the expense (if found) and send a response message
      if ((await snapshot.get()).exists) {
        snapshot.set(body);
        response.status(200).send(`Expense with ID: ${expense_id} is updated.`);
      } else response.status(400).send("Expense Not Found");
    });
  }
);
