import React from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  name: string;
  email: string;
  role: string;
}

//Member status display on manage board - name, email, role and remove
export default function MemberStatus({ name, email, role }: Props) {
  const [newRole, setNewRole] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setNewRole(event.target.value as string);
  };

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
          defaultValue={role}
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
        <Button>
          <Typography fontWeight={"bold"} color="primary" variant="h6">
            X
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
