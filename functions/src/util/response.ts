import { Response } from "firebase-functions/v1";
import { ResponseBody } from "../../../types";

export function sendJSON(response: Response, content: any) {
  const responseBody: ResponseBody = {
    status: "success",
    content,
  };
  response.json(responseBody);
}

export function sendUserFailure(response: Response, content: string) {
  const responseBody: ResponseBody = {
    status: "failure",
    content,
  };
  response.status(400).send(responseBody);
  response.end();
}

export function sendServerFailure(response: Response, content: string) {
  const responseBody: ResponseBody = {
    status: "failure",
    content,
  };
  response.status(500).send(responseBody);
}
