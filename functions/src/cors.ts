import * as cors from "cors";

const options = {
  origin: ["http://localhost:3000", "https://bulletin-be82d.web.app"],
};

const corsHandler = cors(options);

export default corsHandler;
