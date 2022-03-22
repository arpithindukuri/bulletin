import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { useTypedSelector } from "./hooks/ReduxHooks";
import { selectUserData } from "./actions/UserActions/UserSelector";
import { useNavigate } from "react-router-dom";

const AuthGuard: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useTypedSelector(selectUserData);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userData?.id || !localStorage.getItem("refresh")) {
        setAuthenticated(false);
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/" &&
        location.pathname !== "/home"
      ) {
        navigate("/login");
      }
    } else {
        setAuthenticated(true);
    }
  }, []);

  if (authenticated === null) return <div />;

  return <>{children}</>;
};

export default AuthGuard;
