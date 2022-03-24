import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { Button, TextField } from "@material-ui/core";
import "./Homepage.scss";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };
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
              Organize your household and keep everyone in the loop with Bulletin
            </h3>
          </div>
        </div>
        <div className="title-container">
          <TextField
            className="email-input-field"
            InputLabelProps={{ shrink: false }}
            value={email}
            onChange={handleEmailChange}
            label={email === "" ? "Email" : ""}
            variant="outlined"
            type="password"
            error={errors != ""}
            helperText={errors}
          />
          <Button className="email-signup-button">Sign Up Now!</Button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
