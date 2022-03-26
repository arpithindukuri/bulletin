import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

export default function AddNote() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction="row" justifyContent="flex-start">
      <Link onClick={handleClickOpen} underline="hover" variant="body1">
        Add new note
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave a message to the members of the board and sign off!
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="messageNote"
            label="Message"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
