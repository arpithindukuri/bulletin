import { BoardMember } from "../../../types";
import { isBoardMemberRole } from "./isBoardMemberRole";

export function isBoardMember(arg: any): arg is BoardMember {
  /**
   * Cast arg into type BoardMember.
   */
  const obj: BoardMember = arg;

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
    isBoardMemberRole(obj.role)
  );
}