import { Typography, Container, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import './CreateNewBoard.css';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Link from '@mui/material/Link';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import defaultProfile from "../../imgs/defaultProfile.png";
import usedBoard from "../../imgs/usedBoard.png";
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface State {
    name: string;
    description: string;
    emails: string;
}

export default function CreateNewBoard() {
    const NAME_LIMIT = 20;
    const DESCRIPTION_LIMIT = 50;

    const [values, setValues] = React.useState<State>({
        name: "Board Name",
        description: "Create a new board...",
        emails: "",
    });
    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Back to boards link */}
            <Grid container spacing={1}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start">
                <Grid item xs={2} mt={2} ml={4}>
                    <Link className='BackToBoardsLink' variant='body1' href="YourBoards" underline="hover">
                        Back to boards
                    </Link>
                </Grid>

                {/* Create new board header container */}
                <Grid container spacing={1}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Grid item xs={4} mt={2} ml={8}>
                        <Typography className='CreateNewBoardHeader' variant='h4' color="secondary">
                            Create a new board!
                        </Typography>
                    </Grid>
                </Grid >

                {/* create new board form container */}
                <Grid container spacing={2} direction="row">

                    {/* Create form */}
                    <Grid item xs={6} mt={1} ml={8} direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start">
                        <Typography className='inputTitle' variant='h6' color="primary" sx={{ fontWeight: 'bold' }}>
                            Board Name
                        </Typography>
                        <TextField
                            className="InputText"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange('name')}
                            focused
                            id="name-text"
                            inputProps={{
                                maxlength: NAME_LIMIT
                            }}
                            helperText={`${values.name.length}/${NAME_LIMIT}`}
                            style={{ width: 500 }}
                        />
                        <Typography className='inputTitle' variant='h6' color="primary" sx={{ fontWeight: 'bold' }}>
                            Description
                        </Typography>
                        <TextField
                            className="InputText"
                            variant="outlined"
                            value={values.description}
                            onChange={handleChange('description')}
                            focused
                            align-items="left"
                            id="description-text"
                            inputProps={{
                                maxlength: DESCRIPTION_LIMIT
                            }}
                            helperText={`${values.description.length}/${DESCRIPTION_LIMIT}`}
                            multiline
                            style={{ width: 500, fontWeight: 'bold' }}
                        />
                        <Typography className='inputTitle' variant='h6' color="primary" sx={{ fontWeight: 'bold' }}>
                            Invite members
                        </Typography>
                        <TextField
                            className="InputText"
                            variant="outlined"
                            value={values.emails}
                            onChange={handleChange('emails')}
                            focused
                            multiline
                            rows={4}
                            align-items="left"
                            id="emails-text"
                            helperText="Email, comma separated"
                            style={{ width: 500 }}
                        />

                        {/* Save/Discard Buttons */}
                        <Stack spacing={2} pt={2} direction="row" alignItems="center">
                            <Button className='DiscardButton' variant="contained"
                                style={{ width: "250px", height: "50px", }}
                                onClick={handleClickOpen}>
                                Discard </Button>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">
                                    {"Are you sure you wish to discard this board?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        You can not retreive the board once it has been deleted.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose} variant="contained" style={{ width: "100px", height: "50px"}}>
                                        Disagree
                                    </Button>
                                    <Button onClick={handleClose} href="YourBoards" autoFocus variant="outlined" style={{ width: "100px", height: "50px"}}> 
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Button className='SaveButton' variant="outlined"
                                style={{
                                    width: "250px",
                                    height: "50px",
                                }}> Create Board </Button>
                        </Stack>
                    </Grid>

                    {/* Preview */}
                    <Grid item xs={4} direction="column"
                        justifyContent="center"
                        alignItems="center">

                        {/* Profile Picture */}
                        <Grid item xs={4} pl={8}>
                            <img
                                src={defaultProfile}
                                alt="Add A New Board"
                                width={150}
                            >
                            </img>
                            <Grid item xs={4} pl={10} pb={2}>
                                <Button
                                    variant="text"
                                    component="label"
                                    size="small"
                                >
                                    Upload
                                    <PhotoCamera />
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Grid>

                            {/* Board Preview */}
                            <img
                                src={usedBoard}
                                alt="Add A New Board"
                                width={200}
                            ></img>
                            <Typography className='inputTitle' variant='h6' color="secondary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                {values.name}
                            </Typography>
                            <Typography className='inputTitle' variant='body1' color="primary" sx={{ textAlign: 'center' }}>
                                {values.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        </Box >
    );
}