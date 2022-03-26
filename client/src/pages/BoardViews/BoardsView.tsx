import { Container, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import BoardIcons from "./BoardIcons";
import "./BoardViews.css";
import { selectUserData } from "../../actions/UserActions/UserSelector";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import axiosInstance from "../../axios";
import { useTypedDispatch } from "../../hooks/ReduxHooks";
import { userLoggedIn } from "../../actions/UserActions/UserActionCreator";
import { useEffect, useState } from "react";

interface BoardIconsProps {
  id: string;
  name: string;
}

export default function BoardsView() {
  const userData = useTypedSelector(selectUserData);

  const [currentBoards, setCurrentBoards] = useState<Array<BoardIconsProps>>(
    []
  );

  useEffect(() => {
    setCurrentBoards([]);
    userData.boards.map((boardData: string) => {
      const boardExists = currentBoards.find((obj) => (obj.id = boardData));
      if (!boardExists) {
        let success = true;
        axiosInstance
          .get("/getBoard", { params: { id: boardData } })
          .then((res) => {
            const newBoard: BoardIconsProps = {
              id: boardData,
              name: res.data.board.data.name,
            };
            currentBoards.push(newBoard);
            setCurrentBoards([...currentBoards]);
            console.log("Information recieved Successfully");
          })
          .catch((err) => {
            console.log("error getting user boards: ", err);
            success = false;
          });
      }
    });
  }, [userData]);

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
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <BoardIcons isAdd={true} />
        </Grid>

        {currentBoards.map((mockBoard) => {
          console.log("board is: ", mockBoard);
          return (
            <Grid item key={mockBoard.id} xs={12} sm={6} lg={4} xl={3}>
              <BoardIcons
                name={mockBoard.name}
                id={mockBoard.id}
                isAdd={false}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
