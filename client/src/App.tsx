import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar/Calendar";
import List from "./pages/List/List";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Homepage from "./pages/Homepage/Homepage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AccountInfo from "./pages/AccountInfo/AccountInfo";
import Board from "./pages/Board/Board";
import Header from "./components/Header";
import AuthGuard from "./AuthGuard";
import BoardsView from "./pages/BoardViews/BoardsView";
import ManageBoard from "./pages/ManageBoard/ManageBoard";
import Expenses from "./pages/Expenses/Expenses";
import Notes from "./pages/Notes/Notes";
import SupportUs from "./pages/SupportUs/SupportUs";
import CreateNewBoard from "./pages/CreateNewBoard/CreateNewBoard";
import { store } from "./store";
import { persistor } from "./store";
import "./index.css";

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
                  <Route path="/boardsView" element={<BoardsView />}></Route>
                  <Route path="/notes/:board_id" element={<Notes />}></Route>
                  <Route path="/board/:board_id" element={<Board />}></Route>
                  <Route
                    path="/create-board"
                    element={<CreateNewBoard />}
                  ></Route>
                  <Route
                    path="/expenses/:board_id"
                    element={<Expenses />}
                  ></Route>
                  <Route
                    path="/manage-board/:board_id"
                    element={<ManageBoard />}
                  ></Route>
                  <Route
                    path="/calendar/:board_id"
                    element={<Calendar />}
                  ></Route>
                  <Route path="/lists/:board_id" element={<List />}></Route>
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
