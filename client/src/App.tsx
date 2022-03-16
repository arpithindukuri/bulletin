import { useState } from "react";
import Homepage from "./Homepage/Homepage";
import Dashboard from "./Dashboard/Dashboard";
import AccountInfo from "./AccountInfo/AccountInfo";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
  const navigation = {
    brand: { name: 'BULLETIN', to: '/homepage' },
    links: [
      { name: 'Home', to: '/homepage' },
      { name: 'Log In', to: '/login' },
      { name: 'Sign Up', to: '/signup' }
    ]
  };

  const { brand, links } = navigation;
  return (
    <div className="App">
      {/* <Header brand={brand} links={links} /> */}
      <div>
        {/* <Homepage /> */}
        {/* <Dashboard /> */}
        <AccountInfo />
      </div>
      {/* {<Footer />} */}
    </div>
  );
}

export default App;
