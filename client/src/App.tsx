import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Homepage from "./pages/Homepage/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountInfo from "./pages/AccountInfo/AccountInfo";
import Header from "./components/Header";
import AuthGuard from "./AuthGuard";
import BoardsView from "./pages/BoardViews/BoardsView";
import ManageBoard from "./pages/ManageBoard/ManageBoard";
import Expenses from "./pages/Expenses/Expenses";
import Notes from "./pages/Notes/Notes"
import SupportUs from "./pages/SupportUs/SupportUs";
import CreateNewBoard from "./pages/CreateNewBoard/CreateNewBoard";
import { store } from "./store";
import { persistor } from "./store";
import "./index.css";

const mockBoardData = [{ name: "Doe Family" }];
const mockUserData = [
  { id: 1, name: "Liane Doe", email: "liane.doe@gmail.com", role: "Admin" },
  { id: 2, name: "Dad Doe", email: "dad.doe@gmail.com", role: "Admin" },
  { id: 3, name: "Logan Doe", email: "logan.doe@gmail.com", role: "Member" },
  { id: 4, name: "Aly Doe", email: "aly.doe@gmail.com", role: "Member" },
];

// // Mock Data
// const mockBoardData = [{name: 'Doe Family'}]
// const mockUserData = [{id: 1, name: 'Liane Doe', email: 'liane.doe@gmail.com' , role: 'Admin'},
// {id: 2, name: 'Dad Doe', email: 'dad.doe@gmail.com', role: 'Admin'}, {id: 3, name: 'Logan Doe', email: 'logan.doe@gmail.com',
//  role: 'Member'} , {id: 4, name: 'Aly Doe', email: 'aly.doe@gmail.com', role: 'Member'}];

function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
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
                  <Route path="/support-us" element={<SupportUs />}></Route>
                  <Route path="/boards" element={<BoardsView />}></Route>
                  <Route path="/create-board" element={<CreateNewBoard/>}></Route>
                  <Route
                    path="/expenses"
                    element={<Expenses name="test" />}
                  ></Route>
                  <Route
                    path="/manage-board"
                    element={<ManageBoard name="test" />}
                  ></Route>
                </Routes>
              </AuthGuard>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>

  );
}

export default App;
