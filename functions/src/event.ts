import corsHandler from "./cors";
import { admin, functions } from "./firebase";
import { isEvent } from "./typeguards/event";

/**
 * Gets all events from firestore, under the path /events, and returns it as a json
 * object in the response's body
 */
export const getEvents = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      if (request.method !== "GET")
        response.status(400).send("Bad method. Use GET");

      // TODO: Check auth
      const board_id = request.query.id;
      if (!board_id) {
        response.status(400).send("Specify a board id");
      }
      // Push the new message into Firestore using the Firebase Admin SDK.
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("events")
        .get();

      // Send back a message that we've successfully written the message
      if (snapshot)
        response.status(200).json({
          events: snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          }),
        });
    });
  }
);
export const getEvent = functions.https.onRequest(async (request, response) => {
  // you need corsHandler to allow requests from localhost and the deployed website,
  // so you don't get a CORS error.
  corsHandler(request, response, async () => {
    if (request.method !== "GET")
      response.status(400).send("Bad method. Use GET");

    const event_id = request.query.event_id;
    if (!event_id) {
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
      .collection("events")
      .get();
    const oneEvent = snapshot.docs.filter((events) => events.id === event_id);

    // Send back a message that we've successfully written the message
    if (oneEvent) response.json({ Event: oneEvent.map((doc) => doc.data()) });
    else response.status(400).send("Event Not Found");
  });
});
/**
 * Take the event object send in the request body and insert it into Firestore
 * under the path /events/writeResult.id
 */
export const addEvent = functions.https.onRequest(async (request, response) => {
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
    // In this case, we check if the body is of type event
    if (!isEvent(body)) {
      response.status(400).send("Bad body in request.");
      return;
    }
    //add note at board with board_id
    const snapshot = await admin
      .firestore()
      .collection("boards")
      .doc(String(board_id))
      .collection("events")
      .add(body);

    // Send back a message that we've successfully written the message
    if (snapshot) response.status(201).json({id: snapshot.id});
  });
});
export const deleteEvent = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      if (request.method !== "DELETE")
        response.status(400).send("Bad method. Use DELETE");

      const event_id = request.query.event_id;
      if (!event_id) {
        response.status(400).send("Specify an event id");
      }
      const board_id = request.query.board_id;
      if (!board_id) {
        response.status(400).send("Specify a board id");
      }
      // TODO: Check auth

      /// Get the list based on the event parameters
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("events")
        .doc(String(event_id));

      //delete the event (if found) and send a response message
      if ((await snapshot.get()).exists) {
        snapshot.delete();
        response.status(202).send(`Event with ID: ${event_id} is deleted.`);
      } else response.status(400).send("Event Not Found");
    });
  }
);

export const editEvent = functions.https.onRequest(
  async (request, response) => {
    // you need corsHandler to allow requests from localhost and the deployed website,
    // so you don't get a CORS error.
    corsHandler(request, response, async () => {
      if (request.method !== "PUT")
        response.status(400).send("Bad method. Use PUT");

      const event_id = request.query.event_id;
      if (!event_id) {
        response.status(400).send("Specify an event id");
      }
      const board_id = request.query.board_id;
      if (!board_id) {
        response.status(400).send("Specify a board id");
      }

      const body = request.body;

      // Ensure the body has the necessary information
      // In this case, we check if the body is of type event
      if (!isEvent(body)) {
        response.status(400).send("Bad body in request.");
        return;
      }
      // TODO: Check auth

      // Get the event based on the request parameters
      const snapshot = await admin
        .firestore()
        .collection("boards")
        .doc(String(board_id))
        .collection("events")
        .doc(String(event_id));

      //edit the event (if found) and send a response message
      if ((await snapshot.get()).exists) {
        snapshot.set(body);
        response.status(200).send(`Event with ID: ${event_id} is updated.`);
      } else response.status(400).send("Event Not Found");
    });
  }
);
