import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/bulletin-be82d/us-central1/helloWorld"
    : "https://us-central1-bulletin-be82d.cloudfunctions.net/helloWorld";

function App() {
  const [serverResponse, setServerResponse] = useState("no server response");

  const handleClick = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setServerResponse(JSON.stringify(data));
        console.log(JSON.stringify(data));
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>click button to connect to functions:</p>
        <button onClick={handleClick}>connect to functions</button>
        <p>response from functions:</p>
        <a
          className="App-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {serverResponse}
        </a>
      </header>
    </div>
  );
}

export default App;
