import { Note } from "../../../types";
import { isTimestamp } from "./isTimestamp";

export function isNote(arg: any): arg is Note {
  /**
   * Cast arg into type Note.
   */
  const obj: Note = arg;

  return (
    /**
     * Check that the object exists
     */
    obj && // This line never changes.
    obj !== null && // This line never changes.
    obj !== undefined && // This line never changes.
    /**
     * Check that EVERY field in the object is defined
     */
    obj.id !== undefined &&
    obj.content !== undefined &&
    obj.author !== undefined &&
    obj.author !== undefined &&
    obj.attachmentURL !== undefined &&
    /**
     * Check that EVERY field is the correct type.
     * Note that brackets are important when we use || with &&.
     * Note that we must iterate through all arrays to ensure all values are of the required type.
     */
    (typeof obj.id === "string" || obj.id === null) &&
    typeof obj.content === "string" &&
    typeof obj.author === "string" &&
    isTimestamp(obj.timestamp) &&
    typeof obj.attachmentURL === "string"
  );
}
