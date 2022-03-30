import { User } from "../../../types";
import { isPersonalNote } from "./isPersonalNote";
import { isPersonalReminder } from "./isPersonalReminder";

export function isUser(arg: any): arg is User {
  /**
   * Cast arg into type User.
   */
  const obj: User = arg;

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
    obj.email !== undefined &&
    obj.dateOfBirth !== undefined &&
    obj.phoneNumber !== undefined &&
    obj.overview !== undefined &&
    obj.reminders !== undefined &&
    obj.notes !== undefined &&
    /**
     * Check that EVERY field is the correct type.
     * Note that brackets are important when we use || with &&.
     * Note that we must iterate through all arrays to ensure all values are of the required type.
     */
    (typeof obj.id === "string" || obj.id === null) &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.dateOfBirth === "string" &&
    (obj.alternativeEmail === undefined ||
      typeof obj.alternativeEmail == "string") &&
    typeof obj.phoneNumber == "string" &&
    typeof obj.overview == "string" &&
    Array.isArray(obj.reminders) &&
    obj.reminders.every((val) => isPersonalReminder(val)) &&
    Array.isArray(obj.notes) &&
    obj.notes.every((val) => isPersonalNote(val)) &&
    (obj.idToken === undefined || typeof obj.idToken == "string") &&
    (obj.lastLogin === undefined || typeof obj.lastLogin == "number")
  );
}
