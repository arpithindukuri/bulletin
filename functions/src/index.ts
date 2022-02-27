import corsHandler from "./cors";
import { functions } from "./firebase";
import { addList, getLists } from "./lists";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  corsHandler(request, response, () => {
    // your function body here - use the provided req and res from cors
    // response.set("Access-Control-Allow-Origin", "https://bulletin-be82d.web.app");
    response.json({ response: "Hello from Firebase!" });
  });
});

export { addList, getLists };
