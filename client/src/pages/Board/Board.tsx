import { Typography, Container, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import './Board.css';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import LoadNote from './LoadNotes'

import * as React from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';


import BoardBackground from "../../imgs/Board/BoardBackground.png"
import DailyReminders from "../../imgs/Board/DailyReminders.png"
import Expense from "../../imgs/Board/Expense.png"
import Lists from "../../imgs/Board/Lists.png"
import Note from "../../imgs/Board/Note.png"
import Personal from "../../imgs/Board/Personal.png"
import { width } from "@mui/system";
import AddNote from "./AddNote"

export default function Board() {

    const mockBoardData = { id: 1, boardName: "Doe Family", description: "Welcome to the Doe Family board!" };

    //mock notes
    const mockNotes = [
        { id: 1, message: "I love you", name: "Jon" },
        { id: 2, message: "Seeing Jen", name: "Al" },
    ];

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
                            sx={{ background: '#f0e6db', color: '#AA896B', fontWeight: 'bold', width: ' 80px', height: '80px', fontSize: '60px' }} >
                            {mockBoardData.boardName.split(' ')[0][0]}
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
                                    {mockBoardData.boardName}
                                </Typography>
                                <Typography className="BoardDescription"
                                    variant='body1'
                                    sx={{ textAlign: 'left', fontSize: '14px' }}
                                    style={{ display: "inline-block", whiteSpace: "pre-line" }}>
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
                        direction="row">
                        <Grid
                            className="link-container"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            container
                            direction='column'>
                            <Link variant='body1' color='primary' underline="hover" href="ManageBoard">
                                Manage Board
                            </Link>
                            <AvatarGroup max={4}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    className="functions-bottom-container"
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    container>
                    <Box
                        className="bulletinBoardBox" sx={{ width: '100%', height: '100%' }}>
                        <Grid
                            className="boardContainer"
                            justifyContent="center"
                            alignItems="center"
                            container
                            direction="row"
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
                                    ml={1}
                                    mt={1}
                                    mb={1}
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    direction='row'>
                                    <Grid
                                        className="boardNotes"
                                        container
                                        xs={7}
                                        direction='column'>
                                        <Grid className="NoteHeader" container direction='column'>
                                            <Typography className="noteHeader" variant='body1' sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '20px' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                                Notes
                                            </Typography>
                                            <AddNote />
                                        </Grid>
                                        <Grid className="noteItems"
                                            justifyContent="center"
                                            alignItems="flex-start"
                                            direction='row'>
                                            {mockNotes.map((mockNotes) => {
                                                return (
                                                    <Grid item xs={6} sm={6} mr={1} mt={1} >
                                                        <LoadNote message={mockNotes.message} name={mockNotes.name} id={mockNotes.id} />
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
                                        direction='column'>
                                        <Box mt={1} className='ListBox'>
                                            <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                                List Here
                                            </Typography>
                                        </Box>
                                        <Box mt={1} mb={1} className='ExpenseBox'>
                                            <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                                Expense here
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid
                                    className="personalNotesContainer"
                                    container
                                    direction='column'>
                                    <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                        Personal Notes Here
                                    </Typography>
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
                                    <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                        Calendar
                                    </Typography>
                                </Grid>
                                <Grid
                                    className="todayReminder"
                                    container
                                    item
                                    justifyContent="center"
                                    alignItems="center"
                                    direction="column">
                                    <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                        Reminder
                                    </Typography>
                                </Grid>
                                <Grid
                                    className="nextSevenReminder"
                                    container
                                    item
                                    justifyContent="center"
                                    alignItems="center"
                                    direction="column">
                                    <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                        Next 7 Day Reminder
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </div>
    );
}