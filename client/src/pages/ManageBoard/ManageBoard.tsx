import React, { useEffect, useState } from "react";
import { Typography, Container, Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import MemberStatus from "./MemberStatus";
import Avatar from "@mui/material/Avatar";
import "./ManageBoard.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertColor } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import { selectUserData } from "../../actions/UserActions/UserSelector";

//Mock Info passed into Member Status
const mockMemberInfo = [
  { id: 1, name: "Liane Doe", email: "liane.doe@gmail.com", role: "Admin" },
  { id: 2, name: "Dad Doe", email: "dad.doe@gmail.com", role: "Admin" },
  { id: 3, name: "Logan Doe", email: "logan.doe@gmail.com", role: "Member" },
  { id: 4, name: "Aly Doe", email: "aly.doe@gmail.com", role: "Member" },
];
interface CreateBoardErrors {
  name: string;
  description: string;
}
interface BoardProp {
  name: string;
  description: string;
}
interface MemberProp {
  UserBoardId: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ManageBoard() {
  const userData = useTypedSelector(selectUserData);
  const navigate = useNavigate();
  const NAME_LIMIT = 20;
  const DESCRIPTION_LIMIT = 50;
  const params = useParams();
  const [popupState, setPopupState] = useState(false);
  const [editBoard, setEditBoard] = useState(false);
  const [board, setBoard] = useState<BoardProp>({ name: "", description: "" });
  const [members, setMembers] = useState<Array<MemberProp>>([]);
  const [errors, setErrors] = useState<CreateBoardErrors>({
    name: "",
    description: "",
  });
  const [invitationEmail, setInvitationEmail] = useState<string>("");
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");
  

  useEffect(() => {
    let success = true;
    axiosInstance
      .get("/getBoard", { params: { id: params.board_id } })
      .then((res) => {
        console.log(res);
        if (success) {
          setBoard(res.data.board.data);
        }
      })
      .catch((err) => {
        console.log("error getting board: ", err);
        success = false;
      });
    axiosInstance
      .get("/getBoardUsers", { params: { board_id: params.board_id } })
      .then((res) => {
        console.log(res);
        if (success) {
          setMembers(res.data.users);
        }
      })
      .catch((err) => {
        console.log("error getting users: ", err);
        success = false;
      });
  }, [editBoard]);

  const handleChange =
    (prop: keyof BoardProp) =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBoard({ ...board, [prop]: event.target.value });
    };

  const handleInvitationEmailChange = (event: any) => {
    setInvitationEmail(event.target.value);
  };

  const validateData = () => {
    errors.name = "";
    errors.description = "";

    let errorsExits = false;

    if (!board.name || board.name.length > NAME_LIMIT) {
      errors.name = "Please enter a valid board Name";
      errorsExits = true;
    }

    if (!board.description || board.description.length > DESCRIPTION_LIMIT) {
      errors.description = "Please enter a valid board description.";
      errorsExits = true;
    }

    setErrors({ ...errors });
    return !errorsExits;
  };

  const handleSaveBoard = () => {
    if (!validateData()) {
      return;
    }
    let success = true;
    axiosInstance
      .put(
        "/editBoard",
        { name: board.name, description: board.description },
        { params: { board_id: params.board_id } }
      )
      .then((res) => {
        if (success) {
          setMessage("Board is Edited");
          setMessageOpen(true);
          setMessageSeverity("success");
        } else {
          setMessage("board cannot be edited.");
          setMessageSeverity("error");
          setMessageOpen(true);
        }
      })
      .catch((err) => {
        console.log("error editing board: ", err);
        success = false;
      });
    setPopupState(false);
  };

  const deleteMember = (userBoardid: string, id: string, isLeave: boolean) => {
    const admins = members.filter((member) => {
      if (member.role === "Admin") {
        return member;
      }
    });
    console.log("admins is: ", admins);
    if (admins.length == 1 && admins[0].id === id) {
      setMessage(
        "The only admin cannot be removed. Please assign a new admin first."
      );
      setMessageSeverity("error");
      setMessageOpen(true);
      return;
    }
    axiosInstance
      .delete("/deleteUserFromBoard", {
        params: { board_id: params.board_id, user_id: userBoardid },
      })
      .then((res) => {
        console.log("user is deleted: " + res);
        axiosInstance
          .get("./getUser", { params: { user_id: id } })
          .then((res) => {
            console.log(res);
            const removedUserData = res.data.user;
            const newBoards = res.data.user.boards.filter(
              (board: any) => board !== params.board_id
            );
            console.log(newBoards);
            const newRemovedUserData = {
              ...removedUserData,
              boards: newBoards,
            };
            axiosInstance
              .put("./editUser", newRemovedUserData)
              .then(() => {
                if (isLeave) {
                  navigate("/boardsView");
                }
                console.log("new removed user data is: ", newRemovedUserData);
                console.log("user is edited");
                const index = members.findIndex(
                  (x: MemberProp) => x.id === newRemovedUserData.id
                );
                if (index > -1) {
                  members.splice(index, 1);
                  setMembers([...members]);
                }
              })
              .catch((err) => {
                console.log("error editing user data: ", err);
              });
          })
          .catch((err) => {
            console.log("error editing user data: ", err);
          });

        setMessage("User is removed");

        setMessageSeverity("success");
        setMessageOpen(true);
      });
  };

  const sendInvitation = () => {
    const check = members.filter((member) => member.email === invitationEmail);
    if (check.length > 0) {
      setMessage("User already has access to the board");
      setMessageOpen(true);
      setMessageSeverity("warning");
      return;
    }

    axiosInstance
      .get("/getUserByEmail", { params: { email: invitationEmail } })
      .then((res) => {
        console.log(res);
        const invitedUserData = res.data.user.at(0);
        const Boards = [...invitedUserData.boards];
        Boards.push(params.board_id);
        const newInvitedUserData = { ...invitedUserData, boards: [...Boards] };
        axiosInstance
          .put("./editUser", newInvitedUserData)
          .then(() => {
            console.log("user is edited");
          })
          .catch((err) => {
            console.log("error editing user data: ", err);
          });
        axiosInstance
          .put(
            "./addUserToBoard",
            {
              name: invitedUserData.name,
              email: invitedUserData.email,
              id: invitedUserData.id,
              role: "Member",
            },
            { params: { board_id: params.board_id } }
          )
          .then(() => {
            console.log("user added to board");
            setEditBoard(!editBoard);
          })
          .catch((err) => {
            console.log("error adding user to board: ", err);
          });
        setInvitationEmail("");
        setMessage("User has been added to Board");
        setMessageOpen(true);
        setMessageSeverity("success");
      })
      .catch((err) => {
        console.log("User Not Found", err);
        setMessage("User Not Found");
        setMessageOpen(true);
        setMessageSeverity("error");
      });
  };

  const handleLeaveButton = () => {
    const index = members.findIndex((x: MemberProp) => x.id === userData.id);
    if (index > -1) {
      deleteMember(members[index].UserBoardId, members[index].id, true);
    }
  };

  return (
    <Container maxWidth={false}>
      {popupState ? (
        <Modal
          open={true}
          onClose={() => setPopupState(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="overlayBox">
            <div className="noteHeader">
              <Typography variant="h6">Edit Board</Typography>
              <Button onClick={() => setPopupState(false)}>
                <Typography variant="h5">X</Typography>
              </Button>
            </div>
            <Typography
              className="inputTitle"
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Board Name
            </Typography>
            <TextField
              className="InputText"
              variant="outlined"
              value={board.name}
              onChange={handleChange("name")}
              focused
              id="name-text"
              inputProps={{
                maxlength: NAME_LIMIT,
              }}
              helperText={`${board.name.length}/${NAME_LIMIT}  ${errors.name}`}
              error={errors.name !== ""}
            />
            <Typography
              className="inputTitle"
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Description
            </Typography>
            <TextField
              className="InputText"
              variant="outlined"
              value={board.description}
              onChange={handleChange("description")}
              focused
              align-items="left"
              id="description-text"
              inputProps={{
                maxlength: DESCRIPTION_LIMIT,
              }}
              rows="3"
              helperText={`${board.description.length}/${DESCRIPTION_LIMIT}  ${errors.description}`}
              multiline
              style={{ fontWeight: "bold" }}
              error={errors.description !== ""}
            />
            <div className="saveDiv">
              <Button className="saveButton" onClick={handleSaveBoard}>
                Save Board
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
      <a href={"/board/" + params.board_id}>
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="left"
          sx={{ pt: "1vh" }}
        >
          Back to {board.name} Board - Main
        </Typography>
      </a>

      {/* General Board Info: Profile Picture, Name, Duplicate Board */}
      <Box sx={{ pt: "5vh" }}>
        <Box className="manageHeaderBox">
          <Box className="managePhotoBox">
            {/* For the board image */}
            <Avatar
              className="profileCircle"
              sx={{
                background: "#f0e6db",
                color: "#AA896B",
                fontWeight: "bold",
                width: " 80px",
                height: "80px",
                fontSize: "60px",
                marginTop: "10px",
              }}
            >
              {board.name.split(" ")[0][0]}
            </Avatar>
          </Box>
          <Box className="boardNameBox">
            {/* For the Board name */}
            <Typography variant="h5" color="primary" fontWeight="bold">
              {board.name}
            </Typography>
            <Button
              disableElevation={true}
              disableFocusRipple={true}
              disableRipple={true}
              disableTouchRipple={true}
              className="renameButton"
              onClick={() => setPopupState(true)}
            >
              <Typography
                className="underlineButton"
                variant="subtitle1"
                color="primary.light"
                textAlign={"left"}
              >
                Edit Board
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>

      <hr style={{ color: "rgb(104, 57, 13, 0.2)", borderWidth: "0.5px" }}></hr>

      {/* New Member Invitation */}
      <Box className="newMemberInvitationBox">
        <Box width={"20%"}>
          <Typography color="primary" variant="h6">
            Invite New Member
          </Typography>
        </Box>
        <Box width={"30%"}>
          <TextField
            label="Email Address"
            value={invitationEmail}
            onChange={handleInvitationEmailChange}
            sx={{ width: "90%" }}
          />
        </Box>

        <Box width={"20%"}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "50px", border: "1px solid #68390D" }}
            onClick={sendInvitation}
          >
            <Typography color="primary" variant="h6">
              Send Invite
            </Typography>
          </Button>
        </Box>
      </Box>

      <hr style={{ color: "rgb(104, 57, 13, 0.2)", borderWidth: "0.5px" }}></hr>

      {/* Member Information */}
      <Box className="memberInfoBox">
        <Typography color="primary" variant="h6" textAlign={"left"}>
          Members
        </Typography>

        <Box display={"flex"} flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
          >
            <Box textAlign={"left"} paddingLeft="20px" width="30%">
              <Typography
                className="memberInfoHeaderBox"
                color="primary"
                variant="subtitle2"
              >
                Name
              </Typography>
            </Box>

            <Box textAlign={"left"} paddingLeft="20px" width="40%">
              <Typography
                className="memberInfoHeaderBox"
                color="primary"
                variant="subtitle2"
              >
                Email
              </Typography>
            </Box>

            <Box textAlign={"left"} paddingLeft="20px" width="25%">
              <Typography
                className="memberInfoHeaderBox"
                color="primary"
                variant="subtitle2"
              >
                Role
              </Typography>
            </Box>

            <Box width="5%"></Box>
          </Box>

          {members.map((member) => {
            return (
              <MemberStatus
                onDelete={deleteMember}
                userBoardid={member.UserBoardId}
                id={member.id}
                name={member.name}
                email={member.email}
                role={member.role}
              ></MemberStatus>
            );
          })}
        </Box>
      </Box>

      <hr style={{ color: "rgb(104, 57, 13, 0.2)", borderWidth: "0.5px" }}></hr>
      <Box className="leaveBoardButtons">
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "20%",
            borderRadius: "50px",
            border: "1px solid #68390D",
          }}
          onClick={handleLeaveButton}
        >
          <Typography color="primary" variant="h6">
            Leave Board
          </Typography>
        </Button>

        {/* <Button
          variant="contained"
          color="warning"
          sx={{
            width: "20%",
            borderRadius: "50px",
            border: "1px solid #68390D",
          }}
          onClick={deleteBoard}
        >
          <Typography color="primary" variant="h6">
            Delete Board
          </Typography>
        </Button> */}
      </Box>
      <Snackbar
        open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}
      >
        <Alert severity={messageSeverity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
