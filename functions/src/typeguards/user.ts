import { User } from "../../../types";

export function isUser(arg: any): arg is User {
  // cast any argument being sent into the user
  const obj: User = arg;

  return (
    // Check that the user exists
    obj &&
    // Check that the user's fields are defined
    obj.id !== undefined &&
    obj.name !== undefined &&
    obj.email !== undefined &&
    obj.alternativeEmail !== undefined &&
    obj.phoneNumber !== undefined &&
    obj.overview !== undefined &&
    obj.boards !== undefined &&
    // Check each user has the correct type
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.alternativeEmail == "string" &&
    typeof obj.phoneNumber == "string" &&
    typeof obj.overview == "string" &&
    Array.isArray(obj.boards)
  );
}
