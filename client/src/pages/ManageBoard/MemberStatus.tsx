import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import axiosInstance from "../../axios";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  AlertColor,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/ReduxHooks";
import { selectUserData } from "../../actions/UserActions/UserSelector";

interface Props {
  userBoardid: string;
  id: string;
  name: string;
  email: string;
  role: string;
  onDelete: (arg0: string, arg1: string, arg2: boolean) => void;
}

//Member status display on manage board - name, email, role and remove
export default function MemberStatus({
  userBoardid,
  id,
  name,
  email,
  role,
  onDelete,
}: Props) {
  const params = useParams();
  const userData = useTypedSelector(selectUserData);
  const [newRole, setNewRole] = React.useState(role);
  const [databaseRole, setDatabaseRole] = useState(role);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const editMemberRole = () => {
    axiosInstance
      .put(
        "/editUserFromBoard",
        { id: id, name: name, email: email, role: newRole },
        { params: { user_id: userBoardid, board_id: params.board_id } }
      )
      .then((res) => {
        setDatabaseRole(newRole);
        console.log("user's role has been changed: " + res);
        setMessage("User's role has been changed");
        setMessageSeverity("success");
        setMessageOpen(true);
      })
      .catch((err) => {
        console.log("error changing user role: ", err);
        setMessage("Failed changing user role.");
        setMessageSeverity("error");
        setMessageOpen(true);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setNewRole(event.target.value);
  };

  useEffect(() => {
    if (newRole != databaseRole) {
      editMemberRole();
    }
  }, [newRole]);

  return (
    <div>
      <Box display={"flex"} flexDirection={"row"} justifyContent="space-evenly">
        <Box
          width="30%"
          sx={{ border: "1px solid rgb(104, 57, 13)" }}
          alignItems="center"
          display={"flex"}
          justifyContent="center"
        >
          <Typography color={"primary"}>{name}</Typography>
        </Box>

        <Box
          width="40%"
          sx={{ border: "1px solid rgb(104, 57, 13)" }}
          alignItems="center"
          display={"flex"}
          justifyContent="center"
        >
          <Typography color={"primary"}>{email}</Typography>
        </Box>

        <Box
          width="25%"
          sx={{ border: "1px solid rgb(104, 57, 13)" }}
          alignItems="center"
          display={"flex"}
          justifyContent="center"
        >
          {/* <Typography color={"primary"}> */}
          <Select
            sx={{ width: "100%" }}
            // labelId="demo-simple-select-label"
            // id="demo-simple-select"
            variant="outlined"
            // value={role}
            color="primary"
            defaultValue={newRole}
            onChange={handleChange}
          >
            <MenuItem color="primary" value={"Admin"}>
              Admin
            </MenuItem>
            <MenuItem color="primary" value={"Member"}>
              Member
            </MenuItem>
          </Select>
          {/* {role} */}
          {/* </Typography> */}
        </Box>
        <Box
          width="5%"
          display={"flex"}
          flexDirection="row"
          alignItems={"center"}
        >
          {userData.id !== id && (
            <Button onClick={() => onDelete(userBoardid, id, false)}>
              <Typography fontWeight={"bold"} color="primary" variant="h6">
                X
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
      <Snackbar
        open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}
        style={{ position: "absolute", left: "45%" }}
      >
        <Alert severity={messageSeverity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
