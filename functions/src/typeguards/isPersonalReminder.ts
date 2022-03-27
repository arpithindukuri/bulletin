import { PersonalReminder } from "../../../types";
import { isTimestamp } from "./isTimestamp";

export function isPersonalReminder(arg: any): arg is PersonalReminder {
  // cast arg into the user
  const obj: PersonalReminder = arg;

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
    obj.id !== undefined &&
    obj.name !== undefined &&
    obj.time !== undefined &&
    /**
     * Check that EVERY field is the correct type.
     * Note that brackets are important when we use || with &&.
     * Note that we must iterate through all arrays to ensure all values are of the required type.
     */
    (typeof obj.id === "string" || obj.id === null) &&
    typeof obj.name === "string" &&
    isTimestamp(obj.time)
  );
}
