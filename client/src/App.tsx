import { useState } from "react";
import Header  from "./components/Header";
import Footer from "./components/Footer";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Calendar from "./pages/Calendar";
import List from "./pages/List";

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
    <>
    <Header/>
   <BrowserRouter>
   <Routes>
     <Route path='/' element={<Homepage/>}></Route>
     <Route path='/home' element={<Homepage/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/signup' element={<Signup/>}></Route>
     <Route path='/calendar' element={<Calendar/>}></Route>
     <Route path='/list' element={<List/>}></Route>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;