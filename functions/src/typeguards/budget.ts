import { Budget } from "../../../types";

export function isBudget(arg: any): arg is Budget {
  // cast any argument being sent into the item
  const obj: Budget = arg;

  return (
    // Check that the item exists
    obj &&
    // Check that the item's fields are defined
    obj.name !== undefined &&
    obj.assigned !== undefined &&
    obj.balance !== undefined &&
    obj.date !== undefined &&
    
    // Check each item has the correct type
    typeof obj.name === "string" &&
    typeof obj.assigned === "string" &&
    typeof obj.date === "string" &&
    typeof obj.balance === "number"
  );
}