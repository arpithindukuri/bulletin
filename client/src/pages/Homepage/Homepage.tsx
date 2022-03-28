import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Button, TextField } from "@material-ui/core";
import "./Homepage.scss";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import { selectUserData } from "../../actions/UserActions/UserSelector";

const Homepage = () => {
  const navigate = useNavigate();
  const userData = useTypedSelector(selectUserData);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  /**
   * Handles the email field.
   * @param event 
   */
  const handleEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  /**
  * Allows the validation of the value in the email field.
  */
  const validateData = () => {
    if (!email) {
      setErrors("Please enter an email.");
      return false;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setErrors("Please enter a valid email.");
      return false;
    }

    return true;
  };

  /**
   * Handles what happens when the "sign up now" butoon is pressed.
   */
  const handleSignupClick = () => {
    if (!validateData()) {
      return;
    }
    navigate("/signup/" + email);
  };

  useEffect(() => {
    if (userData?.id && localStorage.getItem("refresh")) {
      navigate("/boardsView");
    }
  }, []);

  return (
    <div className="email-signup-page">
      <div className="email-signup-page-inner">
        <div className="title-container">
          <div>
            <img src={logo} className="Bulletin-logo"></img>
          </div>
          <div>
            <h1 className="email-signup-primary">Bulletin</h1>
          </div>
        </div>
        <div className="title-container">
          <div>
            <h3 className="secondary">
              Organize your household and keep everyone in the loop with
              Bulletin
            </h3>
          </div>
        </div>
        <div className="title-container">
          <TextField
            id="homepage-email-field"
            className="email-input-field"
            InputLabelProps={{ shrink: false }}
            value={email}
            onChange={handleEmailChange}
            label={email === "" ? "Email" : ""}
            variant="outlined"
            type="email"
            error={errors !== ""}
            helperText={errors}
          />
          <Button className="email-signup-button" onClick={handleSignupClick}>
            Sign Up Now!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
