import { Container, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import BoardIcons from "./BoardIcons";
import "./BoardViews.css";

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
    <Container sx={{ width: "100%", height: "100%" }} maxWidth={false}>
      {/* Header to filer and sort through existing boards */}
      <Box className="boardHeaderBox">
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
      <Grid container direction="row" className="boardViewsBox" spacing={5}>
        {mockBoards.map((mockBoard) => {
          return (
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <BoardIcons name={mockBoard.name} id={mockBoard.id} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
