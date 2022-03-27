import { BoardMemberRole } from "../../../types";

export function isBoardMemberRole(arg: any): arg is BoardMemberRole {
  /**
   * Cast arg into type User.
   */
  const obj: BoardMemberRole = arg;

  return (
    /**
     * Check that the object exists
     */
    (obj && // This line never changes.
      obj !== null && // This line never changes.
      obj !== undefined && // This line never changes.
      /**
       * Check that the object is the correct type.
       */
      obj === "admin") ||
    obj === "member"
  );
}
