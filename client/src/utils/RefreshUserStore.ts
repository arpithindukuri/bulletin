import { Action, Dispatch } from "redux";
import { userLoggedIn } from "../actions/UserActions/UserActionCreator";
import { selectUserData } from "../actions/UserActions/UserSelector";
import axiosInstance from "../axios";
import { useTypedSelector } from "../hooks/ReduxHooks";

export const refreshUserStore = (
  dispatch: Dispatch<Action>,
  userId: string
) => {
  const userData = useTypedSelector(selectUserData);
  axiosInstance
    .get("/readUser", { params: { userID: userId } })
    .then((uData) => {
      dispatch(userLoggedIn({ ...userData, ...uData.data.content }));
    })
    .catch((userError) => {
      console.log("error while getting user info: ", userError);
    });
};
