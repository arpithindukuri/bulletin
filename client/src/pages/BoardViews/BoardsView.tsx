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
  const dispatch = useTypedDispatch();

  const [currentBoards, setCurrentBoards] = useState<Array<BoardIconsProps>>(
    []
  );
  const [dataLoaded, setDataLoaded] = useState(false);

  console.log("current boards is: ", currentBoards);

  useEffect(() => {
    axiosInstance
      .get("/getUser", { params: { user_id: userData?.id } })
      .then((uData) => {
        dispatch(userLoggedIn({ ...uData.data.user, lastLogin: userData.lastLogin, idToken: userData.idToken }));
        setDataLoaded(true);
      })
      .catch((userError) => {
        console.log("error while getting user info: ", userError);
      });
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      const allBoards: any = [];
      userData?.boards.map(async (boardData: string) => {
        const res = await axiosInstance.get("/getBoard", {
          params: { id: boardData },
        });

        const newBoard: BoardIconsProps = {
          id: boardData,
          name: res.data.board.data.name,
        };
        allBoards.push(newBoard);
        if (allBoards.length == userData?.boards.length) {
          setCurrentBoards([...allBoards]);
          console.log("setting boards");
        }
      });
    }
  }, [userData?.boards, dataLoaded]);

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
