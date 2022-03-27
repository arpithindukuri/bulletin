import { Timestamp } from "../../../types";

export function isTimestamp(arg: any): arg is Timestamp {
  /**
   * Cast arg into type User.
   */
  const obj: Timestamp = arg;

  return (
    /**
     * Check that the object exists
     */
    obj && // This line never changes.
    obj !== null && // This line never changes.
    obj !== undefined && // This line never changes.
    /**
     * Check that the object is the correct type.
     */
    typeof obj === "number"
  );
}
