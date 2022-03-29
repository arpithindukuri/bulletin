import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";
import "./Board.css";
import ViewNote from "./ViewNote";
import LoadNote from "./LoadNotes";
import axiosInstance from "../../axios";
import { useEffect, useState } from "react";
import { selectUserData } from "../../actions/UserActions/UserSelector";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import {
  Board as BoardType,
  Budget,
  Event,
  Expense,
  List,
  Member,
  Note,
} from "../../../../types";

export default function Board() {
  const params = useParams();
  const [expenses, setExpenses] = useState<Array<Expense>>([]);
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [budgets, setBudgets] = useState<Array<Budget>>([]);
  const [board, setBoard] = useState<BoardType>({
    name: "",
    description: "",
    budgets: [],
    events: [],
    expenses: [],
    id: null,
    lists: [],
    members: [],
    notes: [],
    permissions: {
      editCalendar: true,
      editExpenses: true,
      editLists: true,
      editNotes: true,
      editPersonalReminders: true,
      viewCalendar: true,
      viewExpenses: true,
      viewLists: true,
      viewNotes: true,
      viewPersonalReminders: true,
    },
    tags: [],
  });
  const [lists, setLists] = useState<Array<List>>([]);
  const [eventsToday, setEventsToday] = useState<Array<Event>>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const userData = useTypedSelector(selectUserData);

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/readBoard", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res);
        if (success) {
          setBoard(res.data.content as BoardType);
        }
      })
      .catch((err) => {
        console.log("error getting board: ", err);
        success = false;
      });
  }, []);

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/readExpenses", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setExpenses(res.data.content as Expense[]);
        }
      })
      .catch((err) => {
        console.log("error getting expenses: ", err);
        success = false;
      });
  }, []);

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/readMembers", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res);
        console.log(userData.id);
        if (res.data.status === "success") {
          (res.data.content as Member[]).filter((member) => {
            if (member.role === "admin" && member.id === userData.id) {
              setIsAdmin(true);
            }
          });
        }
      })
      .catch((err) => {
        console.log("error getting expenses: ", err);
        success = false;
      });
  }, []);

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/readNotes", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setNotes(res.data.content as Note[]);
        }
      })
      .catch((err) => {
        console.log("error getting notes: ", err);
        success = false;
      });
  }, []);

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/readBudgets", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res.data.status === "success");
        if (success) {
          setBudgets(res.data.content as Budget[]);
        }
      })
      .catch((err) => {
        console.log("error getting budgets: ", err);
        success = false;
      });
  }, []);

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/readLists", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(res.data.status === "success");
        if (success) {
          setLists(res.data.content as List[]);
        }
      })
      .catch((err) => {
        console.log("error getting lists: ", err);
        success = false;
      });
  }, []);

  useEffect(() => {
    let newDate = new Date();
    let day = ("0" + newDate.getDate()).slice(-2);
    let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    let year = newDate.getFullYear();

    let currDate = `${month},${day},${year}`;
    console.log(currDate);
    let success = true;
    axiosInstance
      .get("/readEvents", { params: { boardID: params.board_id } })
      .then((res) => {
        console.log(currDate);
        if (res.data.status === "success") {
          // const filteredEvents = (res.data.content as Event[]).filter(
          //   (event) => event.startTime === currDate
          // );
          setEventsToday(res.data.content as Event[]);
        }
      })
      .catch((err) => {
        console.log("error getting events: ", err);
        success = false;
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        className="board-container"
        direction="column"
        alignContent="center"
        justifyContent="center"
        sx={{ width: "95%" }}
      >
        <Grid
          className="functions-top-container"
          justifyContent="center"
          alignItems="center"
          direction="row"
          mb={1}
          container
        >
          <Grid
            className="profile-info-container-left"
            justifyContent="flex-start"
            alignItems="center"
            container
            xs={6}
            direction="row"
          >
            <Avatar
              className="profileCircle"
              sx={{
                background: "#f0e6db",
                color: "#AA896B",
                fontWeight: "bold",
                width: " 80px",
                height: "80px",
                fontSize: "60px",
                marginTop: "10px",
              }}
            >
              {board.name.split(" ")[0][0]}
            </Avatar>
            <Grid
              className="info-container"
              xs={7}
              justifyContent="flex-start"
              alignItems="center"
              container
              direction="row"
              ml={1}
              sx={{ width: "100%" }}
            >
              <Grid
                className="link-container"
                justifyContent="flex-start"
                alignItems="flex-start"
                container
                direction="column"
              >
                <Typography
                  className="BoardNameHeader"
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    fontWeight: " bold",
                    fontSize: "25px",
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre-line" }}
                >
                  {board.name}
                </Typography>
                <Typography
                  className="BoardDescription"
                  variant="body1"
                  sx={{ textAlign: "left", fontSize: "14px" }}
                  style={{ display: "inline-block", whiteSpace: "pre-line" }}
                >
                  {board.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="buttons-container-right"
            justifyContent="flex-end"
            alignItems="flex-end"
            xs={6}
            container
            direction="row"
          >
            {isAdmin ? (
              <Grid
                className="link-container"
                justifyContent="flex-end"
                alignItems="flex-end"
                container
                direction="column"
              >
                <Link
                  variant="body1"
                  color="primary"
                  fontSize={30}
                  underline="hover"
                  href={"/manage-board/" + params.board_id}
                >
                  Manage Board
                </Link>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid
          className="functions-bottom-container"
          justifyContent="center"
          alignItems="center"
          direction="row"
          mb={1}
          container
        >
          <Box
            className="bulletinBoardBox"
            sx={{ width: "100%", height: "100%" }}
          >
            <Grid
              className="boardContainer"
              justifyContent="center"
              alignItems="center"
              container
              direction="row"
              p={1}
              sx={{ width: "100%", height: "100%" }}
            >
              <Grid
                className="leftBoard"
                justifyContent="center"
                alignItems="center"
                container
                xs={6}
                direction="column"
              >
                <Grid
                  className="topLeftBoard"
                  container
                  justifyContent="center"
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid
                    className="boardNotes"
                    container
                    xs={7}
                    pr={1}
                    direction="column"
                  >
                    <Grid className="NoteHeader" container direction="column">
                      <Typography
                        className="noteHeader"
                        variant="h5"
                        sx={{ textAlign: "left", fontWeight: "bold" }}
                        style={{
                          display: "inline-block",
                          whiteSpace: "pre-line",
                        }}
                      >
                        Notes
                      </Typography>
                      <ViewNote />
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 1 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {notes.map((mockNotes) => {
                        return (
                          // <Grid item xs={6} sm={6} mr={1} mt={1} >
                          <Grid item>
                            <LoadNote
                              message={mockNotes.content}
                              name={mockNotes.author}
                              id={mockNotes.id || ""}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                  <Grid
                    className="listExpensesContainer"
                    container
                    justifyContent="center"
                    alignItems="center"
                    xs={5}
                    pr={3}
                    direction="column"
                  >
                    <Box p={1} className="ListBox">
                      <Typography
                        className="ListFont"
                        variant="h5"
                        sx={{
                          textAlign: "left",
                          fontWeight: "bold",
                          color: " #631800",
                        }}
                      >
                        List
                      </Typography>
                      {lists.map((mockList) => {
                        return (
                          <Typography
                            className="ExpenseFont"
                            p={1}
                            variant="body1"
                            sx={{ textAlign: "left", color: " #631800" }}
                          >
                            {mockList.name}
                          </Typography>
                        );
                      })}
                      <div style={{ width: "100%", textAlign: "left" }}>
                        <Link
                          className="ListFont"
                          m={1}
                          variant="body1"
                          sx={{ textAlign: "left", color: " #631800" }}
                          href={"/lists/" + params.board_id}
                        >
                          View Lists
                        </Link>
                      </div>
                    </Box>
                    <Box mt={1} p={1} className="ExpenseBox">
                      <Typography
                        className="ExpenseFont"
                        variant="h5"
                        sx={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        Expense
                      </Typography>
                      {expenses.map((mockExpense) => {
                        return (
                          <Typography
                            className="ExpenseFont"
                            m={1}
                            variant="body1"
                            sx={{ textAlign: "left", color: " #032200" }}
                          >
                            {mockExpense.name}
                          </Typography>
                        );
                      })}
                      <div style={{ width: "100%", textAlign: "left" }}>
                        <Link
                          className="ExpenseFont"
                          m={1}
                          variant="body1"
                          sx={{
                            textAlign: "left",
                            width: "100%",
                            color: " #032200",
                          }}
                          href={"/expenses/" + params.board_id}
                        >
                          View Expenses
                        </Link>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  className="personalNotesContainer"
                  container
                  direction="column"
                  pr={3}
                  pt={1}
                >
                  <Box p={1} className="PersonalNoteBox">
                    <Grid container direction="column">
                      <Typography
                        className="PersonalNoteFont"
                        variant="h5"
                        sx={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        Budget
                      </Typography>
                      {budgets.map((mockBudget) => {
                        return (
                          <Typography
                            className="PersonalNoteFont"
                            m={0.5}
                            variant="body1"
                            sx={{ textAlign: "left", color: " #032200" }}
                          >
                            {mockBudget.name}
                          </Typography>
                        );
                      })}
                      <Link
                        className="PersonalNoteFont"
                        m={0.5}
                        variant="body1"
                        sx={{ textAlign: "left", color: " #032200" }}
                        href={"/expenses/" + params.board_id}
                      >
                        View more Budget
                      </Link>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                className="rightBoard"
                justifyContent="center"
                alignItems="center"
                container
                xs={6}
                direction="column"
              >
                <Grid
                  className="calendarRightBoard"
                  container
                  item
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  <Box p={1} className="CalendarBox">
                    <Calendar locale={"en-US"} className="react-calendar" />
                  </Box>
                </Grid>
                <Grid
                  className="todayReminder"
                  container
                  item
                  pt={1}
                  pr={2}
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  <Box p={1} className="TodayBox">
                    <Typography
                      className="TodayFont"
                      variant="h5"
                      sx={{ textAlign: "left", fontWeight: "bold" }}
                    >
                      Today
                    </Typography>
                    {eventsToday.map((mockEvent) => {
                      return (
                        <Typography
                          className="TodayFont"
                          m={1}
                          variant="body1"
                          sx={{ textAlign: "left" }}
                        >
                          {mockEvent.name}
                        </Typography>
                      );
                    })}
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <Link
                        className="TodayFont"
                        m={1}
                        variant="body1"
                        sx={{ color: " #62808e" }}
                        href={"/calendar/" + params.board_id}
                      >
                        View Calendar
                      </Link>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
