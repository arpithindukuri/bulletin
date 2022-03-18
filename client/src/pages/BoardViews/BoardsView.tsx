import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import BoardIcons from "./BoardIcons";
import "./BoardViews.css"

export default function BoardsView() {

  //mock board names
  const mockBoards = [
    { id: 0, name: "" },
    { id: 1, name: "Doe Family" },
    { id: 2, name: "Smith Family" },
    { id: 3, name: "Roomates Boards" },
    { id: 4, name: "Friend Group" },
    { id: 5, name: "" },
    { id: 6, name: "" },
    { id: 7, name: "" },
  ];

  return (
    <Container sx={{ width: "90vw" }} maxWidth={false}>

      {/* Header to filer and sort through existing boards */}
      <Box className='boardHeaderBox'>
        <Typography variant="subtitle1" color="primary">
          Your Boards
        </Typography>
        <div>
          <Button size="small" variant="text" color="primary">
            Filter By
          </Button>
          <Button size="small" variant="text" color="primary">
            Sort
          </Button>
        </div>
      </Box>

        {/* Box Displaying the first 4 boards (including new board) */}
      <Box className='boardViewsBox'>
        {mockBoards.slice(0, 4).map((mockBoard) => {
          return (
            <Box sx={{ width: "50%" }}>
              <BoardIcons name={mockBoard.name} id={mockBoard.id} />
            </Box>
          );
        })}
      </Box>

        {/* Box displaying the last 4 boards */}
      <Box
        className='boardViewsBox'
      >
        {mockBoards.slice(4, 8).map((mockBoard) => {
          return (
            <Box sx={{ width: "50%" }}>
              <BoardIcons name={mockBoard.name} id={mockBoard.id} />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
