import { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";
import "./index.css";
import LogIn from "./pages/LogIn/LogIn";

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
    // <ThemeProvider theme={theme}>
      <div className="App">
        <LogIn />
      </div>
    // </ThemeProvider>
  );
}

export default App;
