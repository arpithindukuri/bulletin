import { Action, Dispatch } from "redux";
import { userLoggedIn } from "../actions/UserActions/UserActionCreator";
import axiosInstance from "../axios";

export const refreshUserStore = (
  dispatch: Dispatch<Action>,
  userId: string
) => {
  axiosInstance
    .get("/getUser", { params: { user_id: userId } })
    .then((uData) => {
      dispatch(userLoggedIn({ ...uData.data.user }));
    })
    .catch((userError) => {
      console.log("error while getting user info: ", userError);
    });
};
