import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import NoteRow from "./NoteRow";
import "./Notes.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";

const mockNotes = [
  {
    id: 1,
    name: "Test Note 1 ",
    date: "07/03/22",
    tags: ["Tag1", "Tag2", "test4"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis augue sollicitudin, egestas mi et, maximus diam. Aliquam at eros vel nunc malesuada fermentum ut ut quam. Praesent vitae nulla augue. Integer laoreet lacus quis diam malesuada scelerisque. Morbi lorem nulla, viverra sit amet scelerisque ut, sollicitudin non sapien. Fusce bibendum vitae quam nec suscipit. Quisque aliquam eros tellus, ut luctus felis blandit porta. Nunc in ligula eget tortor efficitur hendrerit. Quisque condimentum tincidunt mi. In sed enim eget tellus facilisis gravida. Aenean augue mi, hendrerit vel lectus vitae, ultrices pharetra velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas egestas consequat risus sed vehicula. Nullam commodo eros arcu, nec ultrices mi auctor vehicula. Sed vestibulum nulla eu magna convallis feugiat. Curabitur scelerisque sagittis augue vitae bibendum. Praesent eu risus in ligula fringilla tincidunt eget nec mauris. Proin condimentum nec turpis vitae consectetur. Donec suscipit massa eget massa fringilla, nec rhoncus nisi auctor. Nam sapien est, ultricies laoreet lacus ut, convallis tempor felis. Sed quis dui neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, purus non placerat lacinia, ante nunc malesuada metus, vel porttitor sem risus eu arcu. Donec mollis, tortor non pharetra varius, magna lectus fringilla velit, ut condimentum ipsum eros eget risus. Morbi pharetra dictum mauris pulvinar pretium. Duis urna mi, congue eu tincidunt eget, tincidunt ut dolor. Ut vulputate facilisis justo, eu rutrum augue imperdiet nec. Ut laoreet ultricies lectus, at bibendum ipsum accumsan eget. Donec sapien nunc, interdum nec mauris aliquet, vehicula porttitor erat. Nam elementum sapien venenatis tortor efficitur venenatis. Vestibulum placerat finibus ante, vestibulum mollis nunc efficitur at. ",
  },
  {
    id: 2,
    name: "Test Note 2",
    date: "20/08/22",
    tags: ["Tag2"],
    content: "note content 1",
  },
  {
    id: 3,
    name: "Test Note 3",
    date: "20/08/22",
    tags: [],
    content: "note content 1",
  },
  {
    id: 4,
    name: "Test Note 4",
    date: "22/03/22",
    tags: ["Tag3"],
    content: "note content 1",
  },
];

const Notes: React.FC = () => {
  const params = useParams();
  const [popupState, setPopupState] = useState(false);
  const [boardName, setBoardName] = useState("");

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

  return (
    <Container sx={{ height: "100vh" }}>
      {popupState ? (
        <div className="overlay">
          <div className="overlayBox">
            <div className="noteHeader">
              <Typography variant="h6">Note Name</Typography>
              <TextField
                variant="standard"
                defaultValue={"Note Name..."}
              ></TextField>
              <Button onClick={() => setPopupState(false)}>
                <Typography variant="h5">X</Typography>
              </Button>
            </div>
            <div className="noteContent">
              <textarea></textarea>
            </div>
            <div className="saveDiv">
              <Button
                className="saveButton"
                onClick={() => setPopupState(false)}
              >
                Save Note
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <a href="/boards">
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="left"
          sx={{ pt: "1vh" }}
        >
          Back to Board {boardName} - Main
        </Typography>
      </a>

      <Typography className="notesTitle" variant="h3">
        Notes
      </Typography>

      <Box>
        <Box className="notesTable">
          <Box className="notesTableRow">
            <Box width={"60%"}>
              <Typography fontWeight={"bold"}>Note Title</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography fontWeight={"bold"}>Date Created</Typography>
            </Box>
            <Box width={"10%"}>
              <Typography fontWeight={"bold"}>Tags</Typography>
            </Box>
            <Box width={"5%"}></Box>
            <Box width={"5%"}></Box>
          </Box>
          {mockNotes.map((notes) => {
            return (
              <Box className="notesTableRow">
                <NoteRow
                  name={notes.name}
                  date={notes.date}
                  tags={notes.tags}
                  content={notes.content}
                ></NoteRow>
              </Box>
            );
          })}
          <Box className="notesTableRow tableCellsFormatting addNewBox">
            <Button
              variant="text"
              fullWidth={true}
              onClick={() => setPopupState(true)}
            >
              <Typography>+ Add New Note</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Notes;
