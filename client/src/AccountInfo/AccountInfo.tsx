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
                        <li><a className="active" href="">Account Information</a></li>
                        <li><a href="">Personalization</a></li>
                        <li><a href="">Groups</a></li>
                        <li><a href="">Support Us</a></li>
                    </ul>
                </div>


                {/* <img src={profile} className="Profile-pic"></img>
                <h1 className="primary">John Doe</h1>
                <h1 className="primary1">Calgary, Alberta</h1>
                <h1 className="primary2">Last Login: 20/02/2022</h1>
                <h1 className="primary3">Brief Overview</h1>
                <h1 className="primary4">Name</h1>
                <h1 className="primary5">Birthday</h1>
                <h1 className="primary6">Email</h1>

                <form>
                    <input type="text" id="overview" placeholder="Tell everyone about yourself (max 150 characters)" className="input"></input>
                    <input type="text" id="name" placeholder="John Doe" className="input1"></input>
                    <input type="date" id="birthday" max="2012-12-31" className="input-date"></input>
                    <input type="email" id="email" placeholder="johndoe@gmail.com" className="input-email"></input>
                </form> */}
            </header>
        </div>
    );
};

export default AccountInfo;