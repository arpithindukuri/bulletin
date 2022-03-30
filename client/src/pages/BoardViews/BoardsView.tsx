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
import { Board } from "../../../../types";

interface BoardIconsProps {
  id: string;
  name: string;
}

export default function BoardsView() {
  const userData = useTypedSelector(selectUserData);
  const dispatch = useTypedDispatch();

  const [currentBoards, setCurrentBoards] = useState<Array<BoardIconsProps>>(
    []
  );
  const [dataLoaded, setDataLoaded] = useState(false);

  console.log("current boards is: ", currentBoards);

  useEffect(() => {
    axiosInstance
      .get("/readUser", { params: { userID: userData.id } })
      .then((uData) => {
        axiosInstance
          .get("/readBoardsByUserID", {
            params: { userID: userData.id },
          })
          .then((res) => {
            console.log(res);
            dispatch(
              userLoggedIn({
                ...userData,
                ...uData.data.content,
                boards: (res.data.content.boards as Board[]).map(
                  (board) => board.id
                ),
              })
            );
            const allBoards: any = [];
            (res.data.content.boards as Board[]).map((board) => {
              const newBoard: BoardIconsProps = {
                id: board.id || "",
                name: board.name,
              };

              allBoards.push(newBoard);

              if (allBoards.length == userData.boards.length) {
                setCurrentBoards([...allBoards]);
                console.log("setting boards");
              }
            });
            setDataLoaded(true);
          });
      })
      .catch((userError) => {
        console.log("error while getting user info: ", userError);
      });
  }, []);

  // useEffect(() => {
  //   if (dataLoaded) {
  //     const allBoards: any = [];
  //     userData.boards.map(async (boardData: string) => {
  //       const res = await axiosInstance.get("/readBoard", {
  //         params: { boardID: boardData },
  //       });

  //       const newBoard: BoardIconsProps = {
  //         id: boardData,
  //         name: res.data.name,
  //       };

  //       allBoards.push(newBoard);

  //       if (allBoards.length == userData.boards.length) {
  //         setCurrentBoards([...allBoards]);
  //         console.log("setting boards");
  //       }
  //     });
  //   }
  // }, [userData.boards, dataLoaded]);

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
