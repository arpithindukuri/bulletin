import React from "react";
import logo from "./logo.svg";
import "./Homepage.css";

const Homepage = () => {

    return (
        <div className="Homepage">
            <header className="Homepage-background">
                <img src={logo} className="Bulletin-logo"></img>
                <h1 className="primary">Bulletin</h1>
                <h3 className="secondary">Organize your household and keep everyone in the loop with Bulletin</h3>
                <button className="button">Sign Up Now!</button>
                <form>
                    <input type="text" id="email" placeholder="Email" className="input"></input>
                </form>
            </header>
        </div>
    );
};


export default Homepage;