import { Board} from "../../../types";
import { BoardUser} from "../../../types";

export function isBoard(arg: any): arg is Board {
  // Try to cast arg (of type any) to obj (of type List), so we can use intellisense
  const obj: Board = arg;

  return (
    // Check that the object exists
    obj &&
    // Check that the object's properties exist
    obj.name !== undefined &&
    obj.description !== undefined &&
    // Check that the object's properties are of the correct type
    typeof obj.name === "string" &&
    typeof obj.description === "string"

  );
}
export function isBoardUser(arg: any): arg is BoardUser {
  // Try to cast arg (of type any) to obj (of type List), so we can use intellisense
  const obj: BoardUser = arg;

  return (
    // Check that the object exists
    obj &&
    // Check that the object's properties exist
    obj.name !== undefined &&
    obj.email !== undefined &&
    obj.id !== undefined &&
    obj.role !== undefined &&
    // Check that the object's properties are of the correct type
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.id === "string" &&
    typeof obj.role === "string"

  );
}
