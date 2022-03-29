import { Action, Dispatch } from "redux";
import { userLoggedIn } from "../actions/UserActions/UserActionCreator";
import axiosInstance from "../axios";

export const refreshUserStore = (
  dispatch: Dispatch<Action>,
  userId: string
) => {
  axiosInstance
    .get("/readUser", { params: { userID: userId } })
    .then((uData) => {
      dispatch(userLoggedIn({ ...uData.data.content }));
    })
    .catch((userError) => {
      console.log("error while getting user info: ", userError);
    });
};
