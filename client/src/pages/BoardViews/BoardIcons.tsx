import { Typography } from "@mui/material";
import usedBoard from "../../assets/usedBoard.png";
import newBoard from "../../assets/newBoard.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './BoardIcons.css';

interface Props {
  name?: string;
  id?: string;
  isAdd: boolean;
}

// Board Images + Names (maximum of 8??)
export default function BoardIcons({ name, id, isAdd }: Props) {
  const navigate = useNavigate();
  //Create New Board
  if (isAdd) {
    return (
      <div
        className="board-icon-container"
        id="add-board-icon"
      >
        <Button
          size="small"
          sx={{
            maxWidth: "10vw",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={() => navigate("/create-board")}
          data-testid="add-board-button"
        >
          <img
            style={{ boxShadow: "1px 5px 8px rgba(165, 165, 165)" }}
            src={newBoard}
            alt="Add A New Board"
            width="80%"
          ></img>
        </Button>
        <Typography color="primary" variant="h6" fontWeight="bold">
          Create A New Board
        </Typography>
      </div>
    );
  }

  if(name == "") return <></>

  return (
    <div className="board-icon-container">
      <Button size="small" sx={{ maxWidth: "10vw" }} onClick={() => navigate("/board/"+id)}>
        <img
          className="board-icon-image"
          src={usedBoard}
          width="80%"
        ></img>
      </Button>
      <Typography color="primary" variant="h6" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body1" color="primary.light" fontWeight="bold">
        Welcome to the {name} board!
      </Typography>
    </div>
  );
}
