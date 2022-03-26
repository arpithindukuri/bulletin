import StyledMenu from "../components/StyledMenu";
import ShowCalendar from "../components/ShowCalendar";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./List.css";
import { Container } from "@material-ui/core";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 450,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function List() {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenTask = () => setOpenTask(true);
  const handleClose = () => setOpen(false);
  const handleCloseTask = () => setOpenTask(false);

  const [textValue, setTextValue] = useState<string>("");
  const handleSave = () => setOpen(false);
  const handleSort = () => setOpen(false);
  const [listType, setlistType] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setlistType(event.target.value as string);
  };

  return (
    <Container style={{marginTop: "40px"}}>
      <a href="/home">
        <p>Back to Doe Family Board - Main</p>
      </a>
      <h1 style={{ color: "#68390D", fontSize: "2.8rem" }}>Lists</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <Button
            style={{
              backgroundColor: "#ECD1C5",
              fontSize: "14px",
            }}
            variant="contained"
            onClick={handleOpen}
          >
            + Add another list
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <StyledMenu />
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "#AA896B",
                fontSize: "14px",
              }}
              variant="contained"
              onClick={handleSort}
            >
              Sort
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              style={{
                color: "#AA896B",
                backgroundColor: "#FFFFFF",
                fontSize: "14px",
                left: "600px",
              }}
              variant="text"
              disableElevation
              onClick={handleClose}
            >
              Discard
            </Button>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="standard-basic"
                  label="Untitled"
                  variant="standard"
                  InputLabelProps={{
                    style: { color: "#B8A590" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Number of Tasks"
                  variant="standard"
                  InputLabelProps={{
                    style: { color: "#675443" },
                  }}
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Type of List
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={listType}
                    label="Types of List"
                    onChange={handleChange}
                  >
                    <MenuItem value={"chores"}>Chores</MenuItem>
                    <MenuItem value={"professional"}>Professional</MenuItem>
                    <MenuItem value={"projects"}>Projects</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <Button
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#AA896B",
                    fontSize: "14px",
                    left: "600px",
                    top: "110px",
                  }}
                  variant="text"
                  disableElevation
                  onClick={handleSave}
                >
                  Save List
                </Button>
              </div>
            </Box>
          </Typography>
        </Box>
      </Modal>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            style={{ marginTop: 50 }}
          >
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <Paper
                  sx={{
                    width: 250,
                    backgroundColor: "#F6F0E9",
                    padding: "10px",
                  }}
                >
                  <h2 className="listTitle">List {value}</h2>
                  <Box>
                    {[1, 2, 3].map((value) => (
                      <>
                        <p className="taskName">Task {value}</p>
                        <p className="taskDots">...</p>
                      </>
                    ))}
                  </Box>
                  <Button
                    style={{
                      backgroundColor: "#F6F0E9",
                      color: "#68390D",
                      fontSize: "14px",
                    }}
                    variant="text"
                    onClick={handleOpenTask}
                  >
                    + Add a Task
                  </Button>
                  <Modal
                    open={openTask}
                    onClose={handleCloseTask}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button
                          style={{
                            color: "#AA896B",
                            backgroundColor: "#FFFFFF",
                            fontSize: "14px",
                            left: "600px",
                          }}
                          variant="text"
                          disableElevation
                          onClick={handleClose}
                        >
                          Discard
                        </Button>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 1, width: "25ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <TextField
                              id="standard-basic"
                              label="Task Name"
                              variant="standard"
                              InputLabelProps={{
                                style: { color: "#B8A590" },
                              }}
                              InputProps={{ disableUnderline: true }}
                              fullWidth
                            />
                          </div>
                          <div>
                            <TextField
                              id="standard-basic"
                              label="Task Description"
                              variant="standard"
                              InputLabelProps={{
                                style: { color: "#675443" },
                              }}
                              InputProps={{ disableUnderline: true }}
                              fullWidth
                            />
                          </div>
                          <div>
                            <Button
                              style={{
                                color: "#FFFFFF",
                                backgroundColor: "#AA896B",
                                fontSize: "14px",
                                left: "600px",
                                top: "110px",
                              }}
                              variant="text"
                              disableElevation
                              onClick={handleSave}
                            >
                              Save Task
                            </Button>
                          </div>
                        </Box>
                      </Typography>
                    </Box>
                  </Modal>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
