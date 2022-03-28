import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";

export default function ViewNote() {
    const params = useParams();


    return (
        <Grid
            container
            direction='row'
            justifyContent="flex-start">
            <Link underline="hover" variant='body1' href={'/notes/'+params.board_id} data-testid="board-notes-redirect">
                 View All notes
            </Link>
        </Grid>
    );
}