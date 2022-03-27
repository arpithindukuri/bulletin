import { Board } from "../../../types";
import { isBoardMember } from "./isBoardMember";
import { isEvent } from "./isEvent";
import { isExpense } from "./isExpense";
import { isList } from "./isList";
import { isMemberPermissions } from "./isMemberPermissions";
import { isNote } from "./isNote";

export function isBoard(arg: any): arg is Board {
  /**
   * Cast arg into type Board.
   */
  const obj: Board = arg;

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
    obj.description !== undefined &&
    obj.events !== undefined &&
    obj.expenses !== undefined &&
    obj.id !== undefined &&
    obj.lists !== undefined &&
    obj.memberPermissions !== undefined &&
    obj.members !== undefined &&
    obj.name !== undefined &&
    obj.notes !== undefined &&
    /**
     * Check that EVERY field is the correct type.
     * Note that brackets are important when we use || with &&.
     * Note that we must iterate through all arrays to ensure all values are of the required type.
     */
    typeof obj.description === "string" &&
    Array.isArray(obj.events) &&
    obj.events.every((val) => isEvent(val)) &&
    Array.isArray(obj.expenses) &&
    obj.expenses.every((val) => isExpense(val)) &&
    (typeof obj.id === "string" || obj.id === null) &&
    Array.isArray(obj.lists) &&
    obj.lists.every((val) => isList(val)) &&
    isMemberPermissions(obj.memberPermissions) &&
    Array.isArray(obj.members) &&
    obj.members.every((val) => isBoardMember(val)) &&
    typeof obj.name === "string" &&
    Array.isArray(obj.notes) &&
    obj.notes.every((val) => isNote(val))
  );
}
