import { Typography, Container, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import './Board.css';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';


import BoardBackground from "../../imgs/Board/BoardBackground.png"
import DailyReminders from "../../imgs/Board/DailyReminders.png"
import Expense from "../../imgs/Board/Expense.png"
import Lists from "../../imgs/Board/Lists.png"
import Note from "../../imgs/Board/Note.png"
import Personal from "../../imgs/Board/Personal.png"


export default function Board() {

    return (
        <div className="board">

            <Grid
                className="board-container"
                direction="column"
                alignContent="center"
                container spacing={2}
                sx={{ width: '100%', m: 1 }}
            >
                <Grid
                    className="functions-top-container"
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    container
                    sx={{ border: 'dashed green 1px' }}
                >
                    <Grid
                        className="profile-info-container-left"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        container
                        xs={6}
                        direction="row"
                        sx={{ border: 'dashed red 1px' }}>
                        <Grid
                            className="profile-pic"
                            item
                            ml={1}
                        // sx={{ border: 'dashed red 1px' }}
                        >
                            <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                Profile pic here
                            </Typography>
                        </Grid>

                        <Grid
                            className="info-container"
                            xs={6}
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            container
                            ml={1}
                            direction="column"
                        // sx={{ border: 'dashed red 1px' }}
                        >
                            <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                Board Name
                            </Typography>
                            <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                Description
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        className="buttons-container-right"
                        justifyContent="center"
                        alignItems="flex-end"
                        xs={6}
                        container
                        direction="column"
                        sx={{ border: 'dashed red 1px' }}
                    >
                        <Grid
                            className="info-container"
                            xs={3}
                            justifyContent="flex-start"
                            alignItems="flex-end"
                            item
                            mr={1}
                        // sx={{ border: 'dashed red 1px' }}
                        >
                            <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                Manage Board
                            </Typography>
                        </Grid>
                        <Grid
                            className="info-container"
                            xs={3}
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            item
                        // sx={{ border: 'dashed red 1px' }}
                        >
                            <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                Add more members
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    className="functions-bottom-container"
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    container
                    sx={{ border: 'dashed purple 1px' }}
                ><Box
                    m={1}
                    className="bulletinBoardBox" sx={{ width: '100%' }}
                >
                        <Grid
                            className="board-left"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            container
                            xs={6}
                            direction="row"
                            sx={{ border: 'dashed red 1px' }}>
                            <Grid
                                className="profile-pic"
                                item
                                sx={{ border: 'dashed red 1px' }}>
                                <Typography variant='body1' sx={{ textAlign: 'left' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                    Profile pic here
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}