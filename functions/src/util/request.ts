import { Request, Response } from "firebase-functions/v1";
import { Types } from "../../../types";
import { getTypegaurd } from "../typeguards";
import { sendUserFailure } from "./response";

/**
 * If the request's method does not match the specified `method` argument, the
 * firebase function will be terminated by sending an error message to the user
 * using `errorResponse`.
 * @param request
 * @param method
 * @param errorResponse
 */
export function checkHTTPMethod(
  request: Request,
  method: "POST" | "GET" | "PUT" | "DELETE",
  errorResponse: Response
) {
  if (request.method !== method) {
    sendUserFailure(errorResponse, `Bad method. Use ${method}`);
  }
}

/**
 * If the request body does not have a parameter with the key *param*, the firebase
 * function will be terminated by sending an error message to the user
 * using `errorResponse`.
 * Otherwise, this function will return the value passed by the user with key `param`.
 * @param request
 * @param param
 * @param errorResponse
 * @returns The value passed by the user in the `request` with key `param`.
 */
export function parseParam(
  request: Request,
  param:
    | "boardID"
    | "budgetID"
    | "email"
    | "eventID"
    | "expenseID"
    | "listID"
    | "listItemID"
    | "memberID"
    | "noteID"
    | "personalNoteID"
    | "personalReminderID"
    | "tagID"
    | "userID",
  errorResponse: Response
) {
  const value = request.query[param];

  if (!value || typeof value !== "string") {
    sendUserFailure(errorResponse, `parameter ${value} required, as a string`);
    return null;
  }

  return value;
}

/**
 * If the `request` body cannot be parsed into an object of type `type`, the firebase
 * function will be terminated by sending an error message to the user  using `errorResponse`.
 * Otherwise, this function is **guaranteed** to return an object of type `type`.
 * BUT, you will have to manually cast it to the specified `type` as follows:
 * **const data = parseBodyAsType(...) as `type`**
 * @param request
 * @param type
 * @param errorResponse
 * @returns an object of type "type". This is guaranteed,
 * but you must manally cast it to type *type*
 */
export function parseBodyAsType(
  request: Request,
  type: Types,
  errorResponse: Response
) {
  const data = request.body;
  const typegaurd = getTypegaurd(type);

  if (!typegaurd(data)) {
    sendUserFailure(
      errorResponse,
      `Bad body in request. Use interface ${type} from types/index.ts`
    );
    return null;
  }

  return data;
}
