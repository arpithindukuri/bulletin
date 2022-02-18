import * as functions from "firebase-functions";
import * as cors from "cors";

const options = {
  origin: ["http://localhost:3000", "https://bulletin-be82d.web.app"],
};

const corsHandler = cors(options);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  corsHandler(request, response, () => {
    // your function body here - use the provided req and res from cors
    // response.set("Access-Control-Allow-Origin", "https://bulletin-be82d.web.app");
    response.json({ response: "Hello from Firebase!" });
  });
});
