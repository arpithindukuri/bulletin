import { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";
import "./index.css";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import logo from "./logo.svg";

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
  const navigation = {
    brand: { name: "BULLETIN", to: "/homepage" },
    links: [
      { name: "Home", to: "/homepage" },
      { name: "Log In", to: "/login" },
      { name: "Sign Up", to: "/signup" },
    ],
  };

  const { brand, links } = navigation;
  return (
    <div className="App">
      {/* <Header brand={brand} links={links} /> */}
      <SignUp />
    </div>
  );
}

export default App;
