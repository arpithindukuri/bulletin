import { Typography } from "@mui/material";
import usedBoard from "../../imgs/usedBoard.png";
import newBoard from "../../imgs/newBoard.png";
import emptyBoard from "../../imgs/emptyBoard.png";
import { Button } from "@mui/material";

interface Props {
  name: string;
  id: number;
}

// Board Images + Names (maximum of 8??)
export default function BoardIcons({ name, id }: Props) {

  //Create New Board
  if (id === 0) {
    return (
      <>
        <Button
          size="small"
          sx={{
            maxWidth: "10vw",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <img
            style={{ boxShadow: "1px 5px 8px rgba(165, 165, 165) " }}
            src={newBoard}
            alt="Add A New Board"
            width="80%"
          ></img>
        </Button>
        <Typography color="primary" variant="h6" fontWeight="bold">
          Create A New Board
        </Typography>
      </>
    );
  }

  //Empty Board Slots
  if (id !== 0 && name === "") {
    return (
      <>
        <img
          style={{ boxShadow: "1px 5px 8px rgba(165, 165, 165)" }}
          src={emptyBoard}
          alt="Add A New Board"
          width={"40%"}
        ></img>
      </>
    );
  }

  //Created Board + Name
  return (
    <>
      <Button size="small" sx={{ maxWidth: "10vw" }}>
        <img
          style={{ boxShadow: "1px 5px 8px rgba(165, 165, 165) " }}
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
    </>
  );
}
