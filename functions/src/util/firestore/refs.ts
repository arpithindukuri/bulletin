import { Response } from "firebase-functions/v1";
import { admin } from "../../firebase";
import { sendServerFailure } from "../response";

/**
 * col = collection
 * doc = document
 * NO forward slashes (/) at start and end of any path
 */

/**
 * If the collection at `path` cannot be retrieved, the firebase function will be
 * terminated by sending an error message to the user  using `errorResponse`.
 * Otherwise, this function will return a reference to the collection.
 * @param path
 * @param errorResponse
 * @returns A reference to the collection at `path`.
 */
export async function getColRef(path: string, errorResponse: Response) {
  const snapshot = await admin.firestore().collection(path);

  if (!snapshot)
    sendServerFailure(
      errorResponse,
      `Could not access collection at path ${path}`
    );

  return snapshot;
}

/**
 * If the document at `path` cannot be retrieved,
 * the firebase function will be terminated by sending an error message to the user.
 * Otherwise, this function will return a reference to the document.
 * @param path
 * @param errorResponse
 * @returns A reference to the document at *path*.
 */
export async function getDocRef(path: string, errorResponse: Response) {
  const snapshot = await admin.firestore().doc(path);

  if (!snapshot)
    sendServerFailure(
      errorResponse,
      `Could not access document at path ${path}`
    );

  return snapshot;
}
