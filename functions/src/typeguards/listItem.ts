import { ListItem } from "../../../types";

export function isListItem(arg: any): arg is ListItem {
  // cast any argument being sent into the item
  const obj: ListItem = arg;

  return (
    // Check that the item exists
    obj &&
    // Check that the item's fields are defined
    obj.name !== undefined &&
    obj.isDone !== undefined &&
    
    // Check each item has the correct type
    typeof obj.name === "string" &&
    typeof obj.isDone === "boolean"
  );
}