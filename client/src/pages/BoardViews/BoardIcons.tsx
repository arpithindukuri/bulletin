import { Typography } from "@mui/material";
import usedBoard from "../../imgs/usedBoard.png";
import newBoard from "../../imgs/newBoard.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './BoardIcons.css';

interface Props {
  name: string;
  id: number;
}

// Board Images + Names (maximum of 8??)
export default function BoardIcons({ name, id }: Props) {
  const navigate = useNavigate();
  //Create New Board
  if (id === 0) {
    return (
      <div
        className="board-icon-container"
      >
        <Button
          size="small"
          sx={{
            maxWidth: "10vw",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={() => navigate("/create-board")}
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
      <Button size="small" sx={{ maxWidth: "10vw" }}>
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
