import { Event } from "../../../types";
import { isTag } from "./isTag";
import { isTimestamp } from "./isTimestamp";

export function isEvent(arg: any): arg is Event {
  /**
   * Cast arg into type Event.
   */
  const obj: Event = arg;

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
    obj.startTime !== undefined &&
    obj.endTime !== undefined &&
    obj.description !== undefined &&
    obj.tags !== undefined &&
    /**
     * Check that EVERY field is the correct type.
     * Note that brackets are important when we use || with &&.
     * Note that we must iterate through all arrays to ensure all values are of the required type.
     */
    (typeof obj.id === "string" || obj.id === null) &&
    typeof obj.name === "string" &&
    isTimestamp(obj.startTime) &&
    isTimestamp(obj.endTime) &&
    typeof obj.description === "string" &&
    Array.isArray(obj.tags) &&
    obj.tags.every((val) => isTag(val))
  );
}
