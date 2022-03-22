import { Typography, Container, Box, Button, inputAdornmentClasses } from "@mui/material";
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
    // For Form
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

    // For disarding
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // For Image upload
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    // // For image preview
    // React.useEffect(() => {
    //     if (selectedImage) {
    //         setImageUrl(URL.createObjectURL(selectedImage)); // Doesnt seems to work rn
    //     }
    // }, [selectedImage]);

    return (
        <Box sx={{
            width: "100%",
            justifyContent: "flex-start", alignContent: "center"
        }}>

            {/* Back to boards link */}
            <Grid container
                spacing={1}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ m: 2 }}>
                <Link className='BackToBoardsLink' variant='body1' href="YourBoards" underline="hover">
                    Back to boards
                </Link>

                {/* Create new board header container */}
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ width: '100%' }}>


                    <Grid item xs={6} mt={2} direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{ width: '100%' }}>
                        <Typography className='CreateNewBoardHeader' variant='h4' color="secondary" sx={{ fontWeight: 'bold', width: '100%' }}>
                            Create a new board!
                        </Typography>

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
                            style={{ width: '100%' }}
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
                            style={{ width: '100%' }}
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
                            style={{ width: '100%' }}
                        />

                        {/* Save/Discard Buttons */}
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Button className='DiscardButton' variant="contained"
                                style={{ width: '100%', minHeight: "50px", }}
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
                                    <Button autoFocus onClick={handleClose} variant="contained" style={{ width: "100%", height: "50px" }}>
                                        Disagree
                                    </Button>
                                    <Button onClick={handleClose} href="YourBoards" autoFocus variant="outlined" style={{ width: "100%", height: "50px" }}>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Button className='SaveButton' variant="outlined"
                                style={{ width: '100%', minHeight: "50px", }}> Create Board </Button>
                        </Stack>
                    </Grid>
                    {/* Preview */}
                    <Grid item xs={4} mt={2} direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{ width: '100%' }}>

                        {/* Profile Picture */}
                        <Grid item xs={4}>
                            <img className="profilePicture"
                                src={defaultProfile}
                            // src={imageUrl}
                            // alt={selectedImage.name}
                            >
                            </img>
                        </Grid>
                        <Grid item xs={4}>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{ display: 'none' }}
                            // onChange={e => setSelectedImage(e.target.files[0])}
                            />
                            <Button
                                variant="text"
                                component="label"
                                size="small"
                                sx={{ fontWeight: 'bold', textAlign: 'center' }}
                            >
                                Upload
                                <PhotoCamera />

                            </Button>
                        </Grid>

                        <Grid item xs={4}>
                            {/* Board Preview */}
                            <img
                                src={usedBoard}
                                alt="Add A New Board"
                            ></img>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className='inputTitle' variant='h6' color="secondary" sx={{ fontWeight: 'bold', textAlign: 'center' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                {values.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className='inputTitle' variant='body1' color="primary" sx={{ textAlign: 'center' }} style={{ display: "inline-block", whiteSpace: "pre-line" }}>
                                {values.description}
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid >
            </Grid >
        </Box >
    );
}