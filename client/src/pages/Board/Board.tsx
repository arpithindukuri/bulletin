import { Typography, Container, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Link from '@mui/material/Link';
import { useParams } from "react-router-dom";
import './Board.css';
import ViewNote from "./ViewNote"
import LoadNote from './LoadNotes'
import axiosInstance from "../../axios";
import { useEffect, useState } from "react";

interface ReminderState {
    reminderType: string;
    data: {}[];
}
interface NotesProp {
    id: string;
    name: string;
    date: string;
    content: string;
  }
interface ExpenseProp {
    id: string;
    name: string;
    amount: number;
    deadline: string;
  }
  interface BudgetProp {
    name: string;
    date: string;
    assigned: string;
    balance: number;
    id: string;
  }
  interface BoardProp {
    name: string;
    description: string;
  }
  interface ListsProp {
    name: string;
    date: string;
  }
export default function Board() {
    const params = useParams();
    const [expenses, setExpenses] = useState<Array<ExpenseProp>>([]);
    const [notes, setNotes] = useState<Array<NotesProp>>([]);
    const [budgets, setBudgets] = useState<Array<BudgetProp>>([]);
    const [board, setBoard] = useState<BoardProp>({name: "", description: ""});
    const [lists, setLists] = useState<Array<ListsProp>>([]);
    const [eventsToday, setEventsToday] = useState<Array<ListsProp>>([]);
    useEffect(() => {
        let success = true;
        axiosInstance
          .get("/getBoard", { params: { id: params.board_id } })
          .then((res) => {
            console.log(res);
            if (success) {
              setBoard(res.data.board.data);
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
          .get("/getExpenses", { params: { id: params.board_id } })
          .then((res) => {
            console.log(res);
            if (success) {
              setExpenses(res.data.expenses);
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
          .get("/getNotes", { params: { board_id: params.board_id } })
          .then((res) => {
            console.log(res);
            if (success) {
              setNotes(res.data.notes);
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
          .get("/getBudgets", { params: { id: params.board_id } })
          .then((res) => {
            console.log(res);
            if (success) {
              setBudgets(res.data.budgets);
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
          .get("/getLists", { params: { board_id: params.board_id } })
          .then((res) => {
            console.log(res);
            if (success) {
              setLists(res.data.lists);
            }
          })
          .catch((err) => {
            console.log("error getting lists: ", err);
            success = false;
          });
      }, []);
      useEffect(() => {
        let newDate = new Date()
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
    
        let currDate = `${day}/${month}/${year}`;
        
        let success = true;
        axiosInstance
          .get("/getEvents", { params: { id: params.board_id } })
          .then((res) => {
            console.log(currDate);
            if (success) {
                const filteredEvents = res.data.events.filter((event:any)=>event.date === currDate)
                setEventsToday(filteredEvents);
            }
          })
          .catch((err) => {
            console.log("error getting events: ", err);
            success = false;
          });
        
      }, []);
    // Mock data

    // Mock data 
    const mockCalendarDataToday = [{ id: 1, EventName: "Luna Vet Checkup" }, { id: 2, EventName: "Phone meeting with Regional Department" }, ];

    const mockCalendarDataSeven = [{ id: 1, EventName: "Liane Doe’s 45th Birthday" }, { id: 2, EventName: "Logan’s School Ski Feild Trip" }, { id: 3, EventName: "Doctor’s Appointment: Yearly Check-up" }, { id: 4, EventName: "Doctor’s Appointment: Yearly Check-up" }, { id: 5, EventName: "Doctor’s Appointment: Yearly Check-up" }];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Grid
                className="board-container"
                direction="column"
                alignContent="center"
                justifyContent="center"
                sx={{ width: '95%' }}>
                <Grid
                    className="functions-top-container"
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    mb={1}
                    container>
                    <Grid
                        className="profile-info-container-left"
                        justifyContent="flex-start"
                        alignItems="center"
                        container
                        xs={6}
                        direction="row">
                        <Avatar
                            className="profileCircle"
                            sx={{ background: '#f0e6db', color: '#AA896B', fontWeight: 'bold', width: ' 80px', height: '80px', fontSize: '60px', marginTop:"10px" }} >
                            {board.name.split(' ')[0][0]}
                        </Avatar>
                        <Grid
                            className="info-container"
                            xs={7}
                            justifyContent="flex-start"
                            alignItems="center"
                            container
                            direction="row"
                            ml={1}
                            sx={{ width: '100%' }}>
                            <Grid
                                className="link-container"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                container
                                direction='column'>
                                <Typography className="BoardNameHeader"
                                    variant='body1'
                                    sx={{
                                        textAlign: 'left',
                                        fontWeight: ' bold',
                                        fontSize: '25px'
                                    }}
                                    style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                    {board.name}
                                </Typography>
                                <Typography className="BoardDescription"
                                    variant='body1'
                                    sx={{ textAlign: 'left', fontSize: '14px' }}
                                    style={{ display: "inline-block", whiteSpace: "pre-line" }}>
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
                        direction="row">
                        <Grid
                            className="link-container"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            container
                            direction='column'>
                            <Link variant='body1' color='primary' fontSize={30} underline="hover" href={'/manage-board/'+params.board_id}>
                                Manage Board
                            </Link>
                            
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    className="functions-bottom-container"
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    mb={1}
                    container>
                    <Box
                        className="bulletinBoardBox" sx={{ width: '100%', height: '100%' }}>
                        <Grid
                            className="boardContainer"
                            justifyContent="center"
                            alignItems="center"
                            container
                            direction="row"
                            p={1}
                            sx={{ width: '100%', height: '100%' }}>
                            <Grid
                                className="leftBoard"
                                justifyContent="center"
                                alignItems="center"
                                container
                                xs={6}
                                direction="column">
                                <Grid
                                    className="topLeftBoard"
                                    container
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    direction='row'>
                                    <Grid
                                        className="boardNotes"
                                        container
                                        xs={7}
                                        pr={1}
                                        direction='column'>
                                        <Grid className="NoteHeader" container direction='column'>
                                            <Typography className="noteHeader" variant='h5' sx={{ textAlign: 'left', fontWeight: 'bold' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                                Notes
                                            </Typography>
                                            <ViewNote />
                                        </Grid>
                                        <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                            {notes.map((mockNotes) => {
                                                return (
                                                    // <Grid item xs={6} sm={6} mr={1} mt={1} >
                                                    <Grid item >
                                                        <LoadNote message={mockNotes.content} name={mockNotes.name} id={mockNotes.id} />
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
                                        direction='column'>
                                        <Box p={1} className='ListBox'>
                                            <Typography className='ListFont' variant='h5' sx={{ textAlign: 'left', fontWeight: "bold", color: ' #631800', }}>
                                                List
                                            </Typography>
                                            {lists.map((mockList) => {
                                                return (
                                                    <Typography className="ExpenseFont" p={1} variant='body1' sx={{ textAlign: 'left', color: ' #631800' }} >
                                                        {mockList.name}
                                                    </Typography>
                                                );
                                            })}
                                            <div style={{ width: "100%", textAlign: "left" }}>
                                                <Link className='ListFont' m={1} variant='body1' sx={{ textAlign: 'left', color: ' #631800' }} href={'/lists/'+params.board_id}>
                                                    View Lists
                                                </Link>
                                            </div>
                                        </Box>
                                        <Box mt={1} p={1} className='ExpenseBox'>
                                            <Typography className="ExpenseFont"  variant='h5' sx={{ textAlign: 'left', fontWeight: "bold" }} >
                                                Expense
                                            </Typography>
                                            {expenses.map((mockExpense) => {
                                                return (
                                                    <Typography className="ExpenseFont" m={1} variant='body1' sx={{ textAlign: 'left', color: ' #032200' }} >
                                                        {mockExpense.name}
                                                    </Typography>
                                                );
                                            })}
                                            <div style={{ width: "100%", textAlign: "left" }}>
                                                <Link className='ExpenseFont' m={1} variant='body1' sx={{ textAlign: 'left', width: "100%", color: ' #032200' }}
                                                href={'/expenses/'+params.board_id}>
                                                    View Expenses
                                                </Link>
                                            </div>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid
                                    className="personalNotesContainer"
                                    container
                                    direction='column'
                                    pr={3}
                                    pt={1}>
                                    <Box p={1} className='PersonalNoteBox'>
                                        <Grid container direction="column">
                                            <Typography className="PersonalNoteFont" variant='h5' sx={{ textAlign: 'left', fontWeight: "bold" }} >
                                                Budget
                                            </Typography>
                                            {budgets.map((mockBudget) => {
                                                return (
                                                    <Typography className="PersonalNoteFont" m={0.5} variant='body1' sx={{ textAlign: 'left', color: ' #032200' }} >
                                                        {mockBudget.name}
                                                    </Typography>
                                                );
                                            })}
                                            <Link className='PersonalNoteFont' m={0.5} variant='body1' sx={{ textAlign: 'left', color: ' #032200' }} href={'/expenses/'+params.board_id}>
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
                                direction="column">
                                <Grid
                                    className="calendarRightBoard"
                                    container
                                    item
                                    justifyContent="center"
                                    alignItems="center"
                                    direction="column">
                                    <Box p={1} className='CalendarBox' >
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
                                    direction="column">
                                    <Box p={1} className='TodayBox'>
                                        <Typography className='TodayFont' variant='h5' sx={{ textAlign: 'left', fontWeight: "bold" }}>
                                            Today
                                        </Typography>
                                        {eventsToday.map((mockEvent) => {
                                            return (
                                                <Typography className="TodayFont" m={1} variant='body1' sx={{ textAlign: 'left' }}>
                                                    {mockEvent.name}
                                                </Typography>
                                            );
                                        })}
                                        <div style={{ width: "100%", textAlign: "left" }}>
                                            <Link className='TodayFont' m={1} variant='body1' sx={{ color: ' #62808e' }} href={'/calendar/'+params.board_id}>
                                                View Calendar
                                            </Link>
                                        </div>
                                    </Box>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </div>
    );
}