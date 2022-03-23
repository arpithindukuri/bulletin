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
import { useState } from "react";

export default function BoardsView() {
  const userData = useTypedSelector(selectUserData);
  // const [finished, setFinished] = useState(false);
  const [currentBoards, setCurrentBoards] = useState([{
    id: '0',
    name: ''
  }]);
 
  
  //mock board names
  console.log(userData.date)
  setCurrentBoards([{
    id: '0',
    name: ''
  }]);
  userData.boards.map((boardData: any)=>{
    let success = true;
    axiosInstance
    .get("./getBoard", {params: {id: boardData}})
    .then((res) => {
      const newBoard = {id: boardData, name: res.data.board.data.name};
      const newCurrentBoard = [...currentBoards, newBoard]
      setCurrentBoards(newCurrentBoard);
      console.log(userData)
      if (success) {
        console.log("Information recieved Successfully")
      } else {
        console.log("Information cannot be recieved");
        
      }
      
    })
    .catch((err) => {
      console.log("error getting user boards: ", err);
      success = false;
    });
    });
    
  // );
  // console.log(currentBoards)
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
        
        {currentBoards.map((mockBoard) => {
          return (
            <Grid item key={mockBoard.id} xs={12} sm={6} lg={4} xl={3}>
              <BoardIcons name={mockBoard.name} id={mockBoard.id} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
