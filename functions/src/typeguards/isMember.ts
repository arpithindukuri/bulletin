import { Member } from "../../../types";
import { isRole } from "./isRole";

export function isMember(arg: any): arg is Member {
  /**
   * Cast arg into type Member.
   */
  const obj: Member = arg;

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
    obj.userID !== undefined &&
    obj.role !== undefined &&
    /**
     * Check that EVERY field is the correct type.
     * Note that brackets are important when we use || with &&.
     * Note that we must iterate through all arrays to ensure all values are of the required type.
     */
    typeof obj.userID === "string" &&
    isRole(obj.role)
  );
}
