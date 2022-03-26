import { Typography, Container, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "@mui/material/Link";

import "./Board.css";
import AddNote from "./AddNote";
import LoadNote from "./LoadNotes";

interface ReminderState {
  reminderType: string;
  data: {}[];
}

export default function Board() {
  // Mock data
  const mockBoardData = {
    id: 1,
    boardName: "Doe Family",
    description: "Welcome to the Doe Family board!",
  };
  const mockNotes = [
    { id: 1, message: "I love you, mwah mwah mwah mwah mwah ", name: "Jon" },
    { id: 2, message: "Seeing Jen", name: "Julia" },
    {
      id: 3,
      message: "Walking Luna, will be back soon",
      name: "A very long name",
    },
    { id: 4, message: "Watching a movie", name: "Jax" },
  ];
  const mockList = [
    { id: 1, ListName: "To do" },
    { id: 2, ListName: "Grocery" },
    { id: 3, ListName: "Chores" },
  ];
  const mockExpense = [
    { id: 1, ExpenseName: "Food" },
    { id: 2, ExpenseName: "Phone bill" },
    { id: 3, ExpenseName: "Electic" },
  ];
  const mockPersonal = [
    { id: 1, NoteName: "Take Luna for a walk" },
    { id: 2, NoteName: "Sign Logan’s School Waiver form tonight" },
    { id: 3, NoteName: "Pick up medicine" },
  ];

  // Mock data
  const mockCalendarDataToday = [
    { id: 1, EventName: "Luna Vet Checkup" },
    { id: 2, EventName: "Phone meeting with Regional Department" },
  ];

  const mockCalendarDataSeven = [
    { id: 1, EventName: "Liane Doe’s 45th Birthday" },
    { id: 2, EventName: "Logan’s School Ski Feild Trip" },
    { id: 3, EventName: "Doctor’s Appointment: Yearly Check-up" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
        paddingBottom: "50px"
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
              }}
            >
              {mockBoardData.boardName.split(" ")[0][0]}
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
                  {mockBoardData.boardName}
                </Typography>
                <Typography
                  className="BoardDescription"
                  variant="body1"
                  sx={{ textAlign: "left", fontSize: "14px" }}
                  style={{ display: "inline-block", whiteSpace: "pre-line" }}
                >
                  {mockBoardData.description}
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
                underline="hover"
                href="ManageBoard"
              >
                Manage Board
              </Link>
              <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar
                  alt="Trevor Henderson"
                  src="/static/images/avatar/5.jpg"
                />
              </AvatarGroup>
            </Grid>
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
                      <AddNote />
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 1 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {mockNotes.map((mockNotes) => {
                        return (
                          // <Grid item xs={6} sm={6} mr={1} mt={1} >
                          <Grid item>
                            <LoadNote
                              message={mockNotes.message}
                              name={mockNotes.name}
                              id={mockNotes.id}
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
                      {mockList.map((mockList) => {
                        return (
                          <Typography
                            className="ExpenseFont"
                            p={1}
                            variant="body1"
                            sx={{ textAlign: "left", color: " #631800" }}
                          >
                            {mockList.ListName}
                          </Typography>
                        );
                      })}
                      <div style={{ width: "100%", textAlign: "left" }}>
                        <Link
                          className="ListFont"
                          m={1}
                          variant="body1"
                          sx={{ textAlign: "left", color: " #631800" }}
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
                      {mockExpense.map((mockExpense) => {
                        return (
                          <Typography
                            className="ExpenseFont"
                            m={1}
                            variant="body1"
                            sx={{ textAlign: "left", color: " #032200" }}
                          >
                            {mockExpense.ExpenseName}
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
                        Personal Notes
                      </Typography>
                      {mockPersonal.map((mockPersonal) => {
                        return (
                          <Typography
                            className="PersonalNoteFont"
                            m={0.5}
                            variant="body1"
                            sx={{ textAlign: "left", color: " #032200" }}
                          >
                            {mockPersonal.NoteName}
                          </Typography>
                        );
                      })}
                      <Link
                        className="PersonalNoteFont"
                        m={0.5}
                        variant="body1"
                        sx={{ textAlign: "left", color: " #032200" }}
                      >
                        View more notes
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
                    {mockCalendarDataSeven.map((mockCalendarDataSeven) => {
                      return (
                        <Typography
                          className="TodayFont"
                          m={1}
                          variant="body1"
                          sx={{ textAlign: "left" }}
                        >
                          {mockCalendarDataSeven.EventName}
                        </Typography>
                      );
                    })}
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <Link
                        className="TodayFont"
                        m={1}
                        variant="body1"
                        sx={{ color: " #62808e" }}
                      >
                        View Calendar
                      </Link>
                    </div>
                  </Box>
                </Grid>
                <Grid
                  className="nextSevenReminder"
                  container
                  item
                  pt={1}
                  pr={2}
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  <Box p={1} className="SevenDayBox">
                    <Typography
                      className="SevenDayFont"
                      variant="h5"
                      sx={{ textAlign: "left", fontWeight: "bold" }}
                    >
                      Today
                    </Typography>
                    {mockCalendarDataToday.map((mockCalendarDataToday) => {
                      return (
                        <Typography
                          className="SevenDayFont"
                          m={1}
                          variant="body1"
                          sx={{ textAlign: "left" }}
                        >
                          {mockCalendarDataToday.EventName}
                        </Typography>
                      );
                    })}
                    <div style={{ width: "100%", textAlign: "left" }}>
                      <Link
                        className="SevenDayFont"
                        m={1}
                        variant="body1"
                        sx={{ color: " #62678e" }}
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
