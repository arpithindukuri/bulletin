import StyledMenu from "../../components/StyledMenu";
import ShowCalendar from "../../components/ShowCalendar";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Event from "../../models/Event";
import { Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import "./Calendar.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EventErrors {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface DatabaseEvent {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

export default function Calendar() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [tags, setTag] = useState("");
  const [boardName, setBoardName] = useState("");
  const [allEvents, setAllEvents] = useState<Array<Event>>([]);
  const [errors, setErrors] = useState<EventErrors>({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string);
  };

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEventName(event.target.value);
  };

  const handleEventDateChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEventDate(event.target.value);
  };

  const handleEventStartChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEventStartTime(event.target.value);
  };

  const handleEventEndChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEventEndTime(event.target.value);
  };

  const handleEventDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEventDescription(event.target.value);
  };

  const formatEvents = (events: Array<DatabaseEvent>) => {
    const newEvents: Array<Event> = [];
    events.map((e) => {
      const newEvent: any = {};
      newEvent.id = e.id;
      newEvent.title = e.name;
      const dateArray = e.date.split(",");
      const newDate = new Date(
        parseInt(dateArray[2].trim()),
        parseInt(dateArray[0].trim()) - 1,
        parseInt(dateArray[1].trim())
      )
        .toISOString()
        .replace(/T.*$/, "");
      newEvent.start = newDate + "T" + e.startTime;
      newEvent.end = newDate + "T" + e.endTime;

      newEvents.push(newEvent);
    });

    return newEvents;
  };

  const validateData = () => {
    errors.name = "";
    errors.date = "";
    errors.startTime = "";
    errors.endTime = "";
    errors.description = "";

    let errorsExits = false;

    if (!eventName) {
      errors.name = "Enter an event name.";
      errorsExits = true;
    }

    if (!eventDate) {
      errors.date = "Enter a date.";
      errorsExits = true;
    } else if (!eventDate.match(/^\d{2},\d{2},\d{4}$/)) {
      errors.date = "Enter date in the format MM,DD,YYYY";
      errorsExits = true;
    }

    if (!eventStartTime) {
      errors.startTime = "Enter a start time.";
      errorsExits = true;
    } else if (
      !eventStartTime.match(/^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/)
    ) {
      errors.startTime = "Enter time in the format HH:MM:SS";
      errorsExits = true;
    }

    if (!eventEndTime) {
      errors.endTime = "Enter an end time.";
      errorsExits = true;
    } else if (
      !eventEndTime.match(/^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/)
    ) {
      errors.endTime = "Enter time in the format HH:MM:SS";
      errorsExits = true;
    }

    setErrors({ ...errors });
    return !errorsExits;
  };

  const handleSave = () => {
    if (!validateData()) {
      return;
    }

    const values = {
      name: eventName,
      date: eventDate,
      startTime: eventStartTime,
      endTime: eventEndTime,
      description: eventDescription,
    };

    axiosInstance
      .post("/addEvent", values, { params: { id: params.board_id } })
      .then((res) => {
        console.log("add event response is: ", res);
        const newEvent = {
          id: res.data.id,
          ...values,
        };
        setAllEvents([...allEvents, ...formatEvents([newEvent])]);
      })
      .catch((err) => {
        console.log("add event error: ", err);
      });
    setOpen(false);
  };

  useEffect(() => {
    axiosInstance
      .get("/getBoard", { params: { id: params.board_id } })
      .then((res) => {
        setBoardName(res.data.board.data.name);
        console.log("Information recieved Successfully");
      })
      .catch((err) => {
        console.log("error getting user boards: ", err);
      });
  }, [params.board_id]);

  useEffect(() => {
    axiosInstance
      .get("/getEvents", { params: { id: params.board_id } })
      .then((res) => {
        console.log("get events response is: ", res);
        setAllEvents(formatEvents([...res.data.events]));
      })
      .catch((err) => {
        console.log("get events error is: ", err);
      });
  }, []);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "30px auto 5px auto",
          width: "90%",
        }}
      >
        <a href={"/board/" + params.board_id}>
          <p>Back to '{boardName}' Board - Main</p>
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <StyledMenu />
          </div>
          <Button
            id="calendar-add-event-button"
            style={{
              backgroundColor: "#AA896B",
              fontSize: "14px",
              left: "50px",
            }}
            variant="contained"
            onClick={handleOpen}
          >
            + Add Event
          </Button>
        </div>
      </div>
      <div>
        <Modal
          id="calendar-add-event-modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              component={"span"}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
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
                    id="calendar-add-event-modal-event-name"
                    label="Event Name"
                    variant="standard"
                    InputLabelProps={{
                      style: { color: "#B8A590" },
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    value={eventName}
                    onChange={handleEventNameChange}
                    error={errors.name != ""}
                    helperText={errors.name}
                  />
                </div>
                <div>
                  <TextField
                    id="calendar-add-event-modal-event-date"
                    label="Date (Month, Day, Year)"
                    variant="standard"
                    InputLabelProps={{
                      style: { color: "#675443" },
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    value={eventDate}
                    onChange={handleEventDateChange}
                    error={errors.date != ""}
                    helperText={errors.date}
                  />
                </div>
                <div>
                  <TextField
                    id="calendar-add-event-modal-event-start-time"
                    label="Start Time(24 Hour Format)"
                    variant="standard"
                    InputLabelProps={{
                      style: { color: "#675443" },
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    value={eventStartTime}
                    onChange={handleEventStartChange}
                    error={errors.startTime != ""}
                    helperText={errors.startTime}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="End Time(24 Hour Format)"
                    variant="standard"
                    InputLabelProps={{
                      style: { color: "#675443" },
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    value={eventEndTime}
                    onChange={handleEventEndChange}
                    error={errors.endTime != ""}
                    helperText={errors.endTime}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Add Description Here"
                    variant="standard"
                    InputLabelProps={{
                      style: { color: "#675443" },
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    value={eventDescription}
                    onChange={handleEventDescriptionChange}
                    error={errors.description != ""}
                    helperText={errors.description}
                  />
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tags}
                      label="Tags"
                      onChange={handleChange}
                    >
                      <MenuItem value={"appointments"}>Appointments</MenuItem>
                      <MenuItem value={"birthdays"}>Birthdays</MenuItem>
                      <MenuItem value={"work"}>Work</MenuItem>
                      <MenuItem value={"family"}>Family</MenuItem>
                      <MenuItem value={"school"}>School</MenuItem>
                      <MenuItem value={"activties"}>Activties</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Button
                    id="calendar-add-event-modal-save-button"
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
                    Save Event
                  </Button>
                </div>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </div>
      <ShowCalendar events={allEvents} setEvents={setAllEvents} />
    </Container>
  );
}
