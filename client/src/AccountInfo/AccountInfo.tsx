import React from "react";
import profile from "./profile.svg";
import logo from "./logo.svg";
import "./AccountInfo.css";

const AccountInfo = () => {
    return (
        <div className="Account">
            <header className="Account-background">
                <div className="account-panel">
                    <img src={profile} className="profile-pic"></img>
                    <h1 className="name">John Doe</h1>
                    <h1 className="last-password">Last Password Change: 20/01/2022</h1>
                </div>

                <div className="side-panel">
                    <img src={logo} className="logo"></img>
                    <ul className="nav">
                        <li><a href="#">My Profile</a></li>
                        <li><a className="active" href="#">Account Information</a></li>
                        <li><a href="#">Personalization</a></li>
                        <li><a href="#">Groups</a></li>
                        <li><a href="#">Support Us</a></li>
                    </ul>
                </div>
                
                <h1 className="account">Account</h1>
                <h1 className="password">Change Your Password</h1>
                <h1 className="new-password">Confirm New Password</h1>
                <h1 className="phone">Add Phone Number</h1>
                <h1 className="email">Primary Email Address</h1>
                <h1 className="alt-email">Alternative Email Address</h1>

                <form>
                    <input type="text" id="password" placeholder="Enter your new password" className="input"></input>
                    <input type="text" id="confirm-password" placeholder="Confirm your new password" className="input1"></input>
                    <input type="text" id="phone" placeholder="Provide your phone number" className="input-phone"></input>
                    <input type="email" id="email" placeholder="johndoe@gmail.com" className="input-email"></input>
                    <input type="email" id="alt-email" placeholder="johndoe1@gmail.com" className="input-email1"></input>
                </form>

                <button className="button"><a href="#">Save</a></button>
            </header>
        </div>
    );
};

export default AccountInfo;