import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Homepage from "./pages/Homepage/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountInfo from "./pages/AccountInfo/AccountInfo";
import Header from "./components/Header";
import AuthGuard from "./AuthGuard";
// import Footer from "./components/Footer";
import { store } from "./store";
import { persistor } from "./store";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <BrowserRouter>
            <AuthGuard>
              <Header />
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/login" element={<LogIn />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/home" element={<Homepage />}></Route>
                <Route path="/account-info" element={<AccountInfo />}></Route>
                <Route path="/profile" element={<Dashboard />}></Route>
              </Routes>
            </AuthGuard>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
