import { Money } from "../../../types";

export function isMoney(arg: any): arg is Money {
  /**
   * Cast arg into type User.
   */
  const obj: Money = arg;

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
