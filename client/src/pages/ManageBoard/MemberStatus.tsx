import React from "react";
import { Box } from "@mui/system";
import axiosInstance from "../../axios";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  userBoardid: string;
  id: string;
  name: string;
  email: string;
  role: string;
  onDelete: (arg0: string, arg1: string)=>void;
  onEdit: (arg0: string, arg1: string, arg2: string, arg3: string, arg4: string)=>void;
}

//Member status display on manage board - name, email, role and remove
export default function MemberStatus({ userBoardid, id, name, email, role, onDelete, onEdit }: Props) {
  const [newRole, setNewRole] = React.useState(role);

  const handleChange = (event: SelectChangeEvent) => {
    setNewRole(event.target.value as string);
    
    onEdit(id, name, email, newRole, userBoardid);
  };
  console.log(newRole)
  
  return (
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
          <MenuItem color='primary' value={"Member"}>Member</MenuItem>
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
        <Button onClick={()=>onDelete(userBoardid, id)}>
          <Typography fontWeight={"bold"} color="primary" variant="h6">
            X
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
