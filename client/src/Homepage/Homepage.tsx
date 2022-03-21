import React, {useState} from "react";
import logo from "./logo.svg";
import "./Homepage.css";

const Homepage = () => {
    const [clickedButton, setClickedButton] = useState('');

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const button: HTMLButtonElement = event.currentTarget;
        setClickedButton(button.name);
    };

    return (
        <div className="Homepage">
            <header className="Homepage-background">
                <img src={logo} className="Bulletin-logo"></img>
                <h1 className="primary">Bulletin</h1>
                <h3 className="secondary">Organize your household and keep everyone in the loop with Bulletin</h3>
                <button className="button" onClick={buttonHandler}>Sign Up Now!</button>
                <form>
                    <input type="text" id="email" placeholder="Email" className="input"></input>
                </form>
            </header>
        </div>
    );
};


export default Homepage;