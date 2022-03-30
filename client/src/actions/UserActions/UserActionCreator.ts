import { USER_LOGGED_IN, USER_SIGNED_OUT } from "./UserTypes";
import UserDataResponse from "../../models/UserDataResponse";

export const userLoggedIn = (data: UserDataResponse) => ({
  type: USER_LOGGED_IN,
  payload: data,
});

export const userSignedOut = () => ({
  type: USER_SIGNED_OUT,
});
