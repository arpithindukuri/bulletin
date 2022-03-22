import { Note } from "../../../types";

export function isNote(arg: any): arg is Note {
  // cast any argument being sent into the note
  const obj: Note = arg;

  return (
    // Check that the note exists
    obj &&
    // Check that the note's fields are defined
    obj.text !== undefined &&
    obj.author !== undefined &&
    obj.date !== undefined &&
    // Check each note has the correct type
    typeof obj.text === "string" &&
    typeof obj.author === "string" &&
    typeof obj.date === "string"
  );
}
