import { isList } from ".";
import { Board} from "../../../types";
import { isEvent } from "./event";
import { isExpense } from "./expense";
import { isNote } from "./notes";

export function isBoard(arg: any): arg is Board {
  // Try to cast arg (of type any) to obj (of type List), so we can use intellisense
  const obj: Board = arg;

  return (
    // Check that the object exists
    obj &&
    // Check that the object's properties exist
    obj.name !== undefined &&
    obj.notes !== undefined &&
    obj.lists !== undefined &&
    obj.expenses !== undefined &&
    obj.events !== undefined &&
    // Check that the object's properties are of the correct type
    typeof obj.name === "string" &&
    obj.notes.every((notes) => isNote(notes)) &&
    obj.lists.every((Lists) => isList(Lists)) &&
    obj.expenses.every((expenses) => isExpense(expenses)) &&
    obj.events.every((events) => isEvent(events))

  );
}
