import { List, ListItem } from "../../../types";

export function isListItem(arg: any): arg is ListItem {
  // Try to cast arg (of type any) to obj (of type ListItem), so we can use intellisense
  const obj: ListItem = arg;

  return (
    // Check that the object exists
    obj &&
    // Check that the object's properties exist
    obj.isDone !== undefined &&
    obj.name !== undefined &&
    // Check that the object's properties are of the correct type
    typeof obj.isDone === "boolean" &&
    typeof obj.name === "string"
  );
}

export function isList(arg: any): arg is List {
  // Try to cast arg (of type any) to obj (of type List), so we can use intellisense
  const obj: List = arg;

  return (
    // Check that the object exists
    obj &&
    // Check that the object's properties exist
    obj.name !== undefined &&
    // Check that the object's properties are of the correct type
    typeof obj.name === "string"
  );
}
