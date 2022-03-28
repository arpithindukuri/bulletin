import { Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import * as React from 'react';

interface Props {
    message: string;
    name: string;
    id: string;
}


export default function LoadNotes({ message, name, id }: Props) {

    //Created Note + Name
    return (
        <Box sx={{ background: '#FDFFE1', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', width: '100%' }}>
            {/* <Grid container direction="column"> */}
            <Grid>
                <Typography m={1} variant='body1' sx={{ fontFamily: 'Roboto', textAlign: 'center', color: 'rgba(107, 77, 0, 0.71);', fontSize: '100%'}}>
                    {message}
                </Typography>
            </Grid>
            <Grid container direction="row" justifyContent="flex-end" alignContent="center">
                <Typography ml={1} mr={1} mb={1} variant='body1' sx={{ fontFamily: 'Roboto', textAlign: 'right', color: 'rgba(132, 95, 0, 0.47)' , fontSize: '90%'}}>
                    {name}
                </Typography>
            </Grid>
        </Box>
    );
}