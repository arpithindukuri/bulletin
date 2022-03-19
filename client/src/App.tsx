import { useState } from "react";
import { theme } from "./theme/theme";
import {ThemeProvider} from "@mui/material/styles";
import "./App.css";
import MockHeader from "./components/MockHeader";
import BoardsView from "./pages/BoardViews/BoardsView";
import ManageBoard from "./pages/ManageBoard/ManageBoard";
import MockFooter from "./components/MockFooter";
import Expenses from "./pages/Expenses/Expenses";
import SupportUs from "./pages/SupportUs/SupportUs";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/bulletin-be82d/us-central1/helloWorld"
    : "https://us-central1-bulletin-be82d.cloudfunctions.net/helloWorld";


// Mock Data
    const mockBoardData = [{name: 'Doe Family'}]
    const mockUserData = [{id: 1, name: 'Liane Doe', email: 'liane.doe@gmail.com' , role: 'Admin'},
    {id: 2, name: 'Dad Doe', email: 'dad.doe@gmail.com', role: 'Admin'}, {id: 3, name: 'Logan Doe', email: 'logan.doe@gmail.com',
     role: 'Member'} , {id: 4, name: 'Aly Doe', email: 'aly.doe@gmail.com', role: 'Member'}];


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
    <ThemeProvider theme={theme}>

    <div className="App">    



{/* My Pages */}
    <MockHeader/>

    {/* <BoardsView/> */}

    {/* <ManageBoard name={mockBoardData[0].name}/> */}

    {/* <Expenses name={mockBoardData[0].name}/> */}

    <SupportUs/>

    {/* <MockFooter/> */}

{/* End of Pages */}





      {/* <Header brand={brand} links={links} />
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
      <Footer/> */}
    </div>
    </ThemeProvider>
  );
}

export default App;
