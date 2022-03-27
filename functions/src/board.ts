
import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isBoard, isBoardUser } from "./typeguards/board";
// import { isUserAuthorized } from "./auth";

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

      // const accessToken = request.get("Authorization")?.split(" ")[1];

      // isUserAuthorized(accessToken).then(res => {
      //   if(!res) {
      //     response.status(401).send("User is unauthorized");
      //   }
      // }).catch(err => {
      //   response.status(401).send("User is unauthorized");
      // })
    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection("boards").get();
    
    // Send back a message that we've successfully written the message
    if (snapshot)
      response.json({ board: snapshot.docs.map((doc) => doc.data()) });
    else 
      response.status(400).send("Board Not Found");
  });
})
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
    const snapshot = await admin.firestore().collection("boards").doc(String(id));
   
    
    // Send back a message that we've successfully written the message
    if ((await snapshot.get()).exists)
      response.json({ board: {
        data: (await snapshot.get()).data()  
      }
    });
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

    // Get the board based on the request parameters
    const writeResult = await admin.firestore().collection("boards").add(body);

    // Send back a message that we've successfully written the message
    if (writeResult) {
      response.json({board: {
        id: writeResult.id,
      }});
    }
  });
});
export const deleteBoard = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "DELETE")
      response.status(400).send("Bad method. Use DELETE");

    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth

    // Get the board based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id));
    
    //delete the event (if found) and send a response message
    if ((await snapshot.get()).exists){
      snapshot.delete();
      response.status(400).send(`Board with ID: ${board_id} is deleted.`);
    }else 
      response.status(400).send("Board Not Found");
  });
});
export const editBoard = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "PUT")
      response.status(400).send("Bad method. Use PUT");

    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }

    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type
    if (!isBoard(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id));
    
    //edit the board (if found) and send a response message
    if ((await snapshot.get()).exists){
      snapshot.set(body);
      response.status(400).send(`Board with ID: ${board_id} is updated.`);
    }else 
      response.status(400).send("Board Not Found");
  });
});

export const addUserToBoard = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // Check HTTP method
    if (request.method !== "PUT")
      response.status(400).send("Bad method. Use PUT");

      const board_id = request.query.board_id
      if(!board_id){
        response.status(400).send("Specify a board id");
      }
      // TODO: Check auth
    // Read the body from the request.
    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type note
    if (!isBoardUser(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    //add note at board with board_id
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('users').add(body);
    
    // Send back a message that we've successfully written the message
    if (snapshot)
      response.send(`Messageasdfg with ID: ${snapshot.id} added.`);
  });
});
export const deleteUserFromBoard = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "DELETE")
      response.status(400).send("Bad method. Use DELETE");

    const user_id = request.query.user_id
    if(!user_id){
      response.status(400).send("Specify a user id");
    }
    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    // TODO: Check auth

    // Get the note based on the request parameters
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('users').doc(String(user_id));
    
    // delete the note (if found) and send back a response
    if ((await snapshot.get()).exists){
      snapshot.delete();
      response.send(`User with ID: ${user_id} is removed.`);
    }
    else 
      response.status(400).send("User Not Found");
  });
});
export const editUserFromBoard = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "PUT")
      response.status(400).send("Bad method. Use PUT");

    const board_id = request.query.board_id
    if(!board_id){
      response.status(400).send("Specify a board id");
    }
    const user_id = request.query.user_id
    if(!user_id){
      response.status(400).send("Specify a user id");
    }

    const body = request.body;

    // Ensure the body has the necessary information
    // In this case, we check if the body is of type
    if (!isBoardUser(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    // TODO: Check auth

    // Push the new message into Firestore using the Firebase Admin SDK.
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('users').doc(String(user_id));
    
    //edit the board (if found) and send a response message
    if ((await snapshot.get()).exists){
      snapshot.set(body);
      response.send(`Board with ID: ${board_id} is updated.`);
    }else 
      response.status(400).send("Board Not Found");
  });
});

export const getBoardUsers = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    // Check HTTP method
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

      const board_id = request.query.board_id
      if(!board_id){
        response.status(400).send("Specify a board id");
      }
      // TODO: Check auth
    // Read the body from the request.
    
    //add note at board with board_id
    const snapshot = await admin.firestore().collection('boards').doc(String(board_id)).collection('users').get();
    
    // Send back a message that we've successfully written the message
    if (snapshot)
    response.json({ users: snapshot.docs.map((doc) => ({ UserBoardId: doc.id, ...doc.data() })) });
  });
});

export const testingDeleteBoard = async (id: string) => {
  const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(id));

      if ((await snapshot.get()).exists) {
        snapshot.delete();
      }
}