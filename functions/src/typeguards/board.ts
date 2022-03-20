import { Board} from "../../../types";

export function isBoard(arg: any): arg is Board {
  // Try to cast arg (of type any) to obj (of type List), so we can use intellisense
  const obj: Board = arg;

  return (
    // Check that the object exists
    obj &&
    // Check that the object's properties exist
    obj.name !== undefined &&
    // Check that the object's properties are of the correct type
    typeof obj.name === "string"

  );
}
