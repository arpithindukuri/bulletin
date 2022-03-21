import React from "react";
import profile from "./pics/profile.svg";
import logo from "./pics/logo.svg";
import avatar1 from "./pics/avatar1.png";
import avatar2 from "./pics/avatar2.png";
import avatar3 from "./pics/avatar3.png";
import avatar4 from "./pics/avatar4.png";
import avatar5 from "./pics/avatar5.png";
import avatar6 from "./pics/avatar6.png";
import avatar7 from "./pics/avatar7.png";
import avatar8 from "./pics/avatar8.png";
import avatar9 from "./pics/avatar9.png";
import "./Personalization.css";

const Personalization = () => {
    
    return (
        <div className="Personalization">
            <header className="Personalization-background">
                <div className="side-panel">
                    <img src={logo} className="logo"></img>
                    <ul className="nav">
                        <li><a href="#">My Profile</a></li>
                        <li><a href="#">Account Information</a></li>
                        <li><a className="active" href="#">Personalization</a></li>
                        <li><a href="#">Groups</a></li>
                        <li><a href="#">Support Us</a></li>
                    </ul>
                </div>
                <div className="Personalization">
                    <img src={profile} className="profile-pic"></img>
                    <h1 className="personal">Personalization</h1>
                    <h1 className="name">John Doe</h1>
                    <h1 className="avatar">Edit Your Avatar </h1>
                    <button className="upload-image"><a href="#">Upload Your Image Here</a></button>
                    <h1 className="appearance">Appperance</h1>
                    <h1 className="light-mode">Light Mode</h1>
                    <h1 className="dark-mode">Dark Mode</h1>

                    <img src={avatar1} className="avatar1"></img>
                    <img src={avatar2} className="avatar2"></img>
                    <img src={avatar3} className="avatar3"></img>
                    <img src={avatar4} className="avatar4"></img>
                    <img src={avatar5} className="avatar5"></img>
                    <img src={avatar6} className="avatar6"></img>
                    <img src={avatar7} className="avatar7"></img>
                    <img src={avatar8} className="avatar8"></img>
                    <img src={avatar9} className="avatar9"></img>

                    <label className="switch">
                        <input type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </div>
            </header>
        </div>
    );
};

export default Personalization;