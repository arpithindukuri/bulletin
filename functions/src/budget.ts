import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isBudget } from "./typeguards/budget";

/**
 * Gets all budgets from firestore, under the path /budgets, and returns it as a json
 * object in the response's body
 */
export const getBudgets = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    // TODO: Check auth
    var board_id = request.query.id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth
 
    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('budgets').get();

    // Send back a message that we've successfully written the message
    if (snapshot)
      response.status(200).json({ budgets: snapshot.docs.map(
        (doc) => {
        return {id: doc.id, ...doc.data()}
      }
      ) 
    });
  });
});

export const getBudget = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    const budget_id = request.query.budget_id
    if(!budget_id){
      response.status(400).send("Specify a budget id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('budgets').get();
    const oneBudget = snapshot.docs.filter((budgets) => (budgets.id === budget_id))
    
    // Send back a message that we've successfully written the message
    if (oneBudget)
      response.status(200).json({ Budget: oneBudget.map((doc) => doc.data()) });
    else 
      response.status(400).send("Budget Not Found");
  });
});

/**
 * Take the budgets object send in the request body and insert it into Firestore
 * under the path /budgets/writeResult.id
 */
export const addBudget = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
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
    // In this case, we check if the body is of type budget
    if (!isBudget(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    //add note at board with board_id
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('budgets').add(body);
    
    // Send back a message that we've successfully written the message
    if (snapshot)
      response.status(201).json({id: snapshot.id});
  });
});
export const deleteBudget = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "DELETE")
      response.status(400).send("Bad method. Use DELETE");

    const budget_id = request.query.budget_id
    if(!budget_id){
      response.status(400).send("Specify a budget id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth

    // Get the budget based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('budgets').doc(String(budget_id));
    
    //delete the budget (if found) and send a response message
    if ((await snapshot.get()).exists){
      snapshot.delete();
      response.status(204).send(`Budget with ID: ${budget_id} is deleted.`);
    } else 
      response.status(400).send("Budget Not Found");
  });
});
export const editBudget = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "PUT")
      response.status(400).send("Bad method. Use PUT");

    const budget_id = request.query.budget_id
    if(!budget_id){
      response.status(400).send("Specify a budget id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }

    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type
    if (!isBudget(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    // TODO: Check auth

    // Get the budget based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('budgets').doc(String(budget_id));
    
    //edit the budget (if found) and send a response message
    if ((await snapshot.get()).exists){
      snapshot.set(body);
      response.status(200).send(`Budget with ID: ${budget_id} is updated.`);
    }else 
      response.status(400).send("Budget Not Found");
  });
});