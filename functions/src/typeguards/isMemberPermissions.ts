import { MemberPermissions } from "../../../types";

export function isMemberPermissions(arg: any): arg is MemberPermissions {
  /**
   * Cast arg into type MemberPermissions.
   */
  const obj: MemberPermissions = arg;

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
    obj.editCalendar !== undefined &&
    obj.editExpenses !== undefined &&
    obj.editLists !== undefined &&
    obj.editNotes !== undefined &&
    obj.editPersonalReminders !== undefined &&
    obj.viewCalendar !== undefined &&
    obj.viewExpenses !== undefined &&
    obj.viewLists !== undefined &&
    obj.viewNotes !== undefined &&
    obj.viewPersonalReminders !== undefined &&
    /**
     * Check that EVERY field is the correct type.
     * Note that brackets are important when we use || with &&.
     * Note that we must iterate through all arrays to ensure all values are of the required type.
     */
    typeof obj.editCalendar === "boolean" &&
    typeof obj.editExpenses === "boolean" &&
    typeof obj.editLists === "boolean" &&
    typeof obj.editNotes === "boolean" &&
    typeof obj.editPersonalReminders === "boolean" &&
    typeof obj.viewCalendar === "boolean" &&
    typeof obj.viewExpenses === "boolean" &&
    typeof obj.viewLists === "boolean" &&
    typeof obj.viewNotes === "boolean" &&
    typeof obj.viewPersonalReminders === "boolean"
  );
}
