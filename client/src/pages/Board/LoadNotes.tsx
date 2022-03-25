import { Typography, Container, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import * as React from 'react';

interface Props {
    message: string;
    name: string;
    id: number;
}


export default function BoardIcons({ message, name, id }: Props) {

    //Created Note + Name
    return (
        <Grid container>
            <Box sx={{ background: '#FDFFE1', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', width: '100%' }}>
                <Grid container direction="column">
                    <Grid>
                        <Typography ml={1} mr={1} mt={1} variant='body1' sx={{ fontFamily: 'Roboto', textAlign: 'center', color: 'rgba(132, 95, 0, 0.47)' }}>
                            {message}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-end" alignContent="center">
                        <Typography ml={1} mr={1} mt={1} variant='body1' sx={{ fontFamily: 'Roboto', textAlign: 'center', color: 'rgba(132, 95, 0, 0.47)' }}>
                            {name}
                        </Typography>
                        <Button sx={{ fontFamily: 'Roboto', textAlign: 'center', color: 'rgba(132, 95, 0, 0.47)' }}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}