import { Role } from "../../../types";

export function isRole(arg: any): arg is Role {
  /**
   * Cast arg into type User.
   */
  const obj: Role = arg;

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
