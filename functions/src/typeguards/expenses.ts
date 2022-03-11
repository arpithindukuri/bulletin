import { Expense } from "../../../types";

export function isExpense(arg: any): arg is Expense {
  // cast any argument being sent into the item
  const obj: Expense = arg;

  return (
    // Check that the item exists
    obj &&
    // Check that the item's fields are defined
    obj.name !== undefined &&
    obj.deadline !== undefined &&
    obj.amount !== undefined &&
    
    // Check each item has the correct type
    typeof obj.name === "string" &&
    typeof obj.deadline === "number" &&
    typeof obj.amount === "number"
  );
}