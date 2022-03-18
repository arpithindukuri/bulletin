import { Typography, Container, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import MemberPermissions from "./MemberPermissions";
import MemberStatus from "./MemberStatus";
import avatar from "../../imgs/avatar.jpg";
import "./ManageBoard.css";

interface Props {
  name: string;
}

export default function ManageBoard({ name }: Props) {
  //Mock Info passed into Member Status
  const mockMemberInfo = [
    { id: 1, name: "Liane Doe", email: "liane.doe@gmail.com", role: "Admin" },
    { id: 2, name: "Dad Doe", email: "dad.doe@gmail.com", role: "Admin" },
    { id: 3, name: "Logan Doe", email: "logan.doe@gmail.com", role: "Member" },
    { id: 4, name: "Aly Doe", email: "aly.doe@gmail.com", role: "Member" },
  ];

  //Headers passed into Member Permissions
  const permissionHeaders = [
    { id: 1, name: "Notes", viewOn: true, editOn: false },
    { id: 2, name: "Lists", viewOn: true, editOn: true },
    { id: 3, name: "Expenses", viewOn: false, editOn: false },
    { id: 4, name: "Calendar", viewOn: true, editOn: false },
    { id: 5, name: "Personal Notes", viewOn: true, editOn: true },
  ];

  return (
    <Container maxWidth={false} sx={{}}>
      <a href="/">
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="left"
          sx={{ pt: "1vh" }}
        >
          Back to {name} Board - Main
        </Typography>
      </a>

      {/* General Board Info: Profile Picture, Name, Duplicate Board */}
      <Box sx={{ pt: "5vh" }}>
        <Box className="manageHeaderBox">
          <Box className="managePhotoBox">
            {/* For the board image */}
            <img className="profilePicture" src={avatar}></img>
            <Button
              sx={{ display: "block", margin: "auto" }}
              disableElevation={true}
              disableFocusRipple={true}
              disableRipple={true}
              disableTouchRipple={true}
            >
              <Typography
                className="underlineButton"
                variant="subtitle1"
                color="primary.light"
              >
                Change Board Picture
              </Typography>
            </Button>
          </Box>
          <Box className="boardNameBox">
            {/* For the Board name */}
            <Typography variant="h5" color="primary" fontWeight="bold">
              {name}
            </Typography>
            <Button
              disableElevation={true}
              disableFocusRipple={true}
              disableRipple={true}
              disableTouchRipple={true}
              sx={{
                display: "block",
              }}
            >
              <Typography
                className="underlineButton"
                variant="subtitle1"
                color="primary.light"
                textAlign={"left"}
              >
                Rename Board
              </Typography>
            </Button>
          </Box>
          <Box className="duplicateBoardBox">
            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: "50px", border: "1px solid #68390D" }}
            >
              <Typography color="primary" variant="h6">
                Duplicate Board
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
            className="testText"
            variant="outlined"
            color="primary"
            label="Email Address"
            sx={{ width: "90%" }}
          />
        </Box>

        <Box width={"20%"}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "50px", border: "1px solid #68390D" }}
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

          {mockMemberInfo.map((members) => {
            return (
              <MemberStatus
                name={members.name}
                email={members.email}
                role={members.role}
              ></MemberStatus>
            );
          })}
        </Box>
      </Box>

      <hr style={{ color: "rgb(104, 57, 13, 0.2)", borderWidth: "0.5px" }}></hr>

      {/* Member Permissions */}
      <Box className="memberInfoBox">
        <Typography color="primary" variant="h6" textAlign={"left"}>
          Member Permissions
        </Typography>

        <Box
          display={"flex"}
          flexDirection="row"
          justifyContent={"space-evenly"}
          paddingTop={"20px"}
        >
          <Box>
            <Box className="permissionsGrid" height="60px"></Box>

            <Box
              className="permissionsGrid"
              height="50px"
              justifyContent={"center"}
            >
              <Typography
                color="primary"
                variant="subtitle1"
                fontWeight="bold"
                textAlign={"center"}
              >
                View
              </Typography>
            </Box>

            <Box className="permissionsGrid" height="50px">
              <Typography
                color="primary"
                variant="subtitle1"
                fontWeight="bold"
                textAlign={"center"}
              >
                Edit
              </Typography>
            </Box>
          </Box>

          {permissionHeaders.map((permissions) => {
            return (
              <Box>
                <MemberPermissions
                  name={permissions.name}
                  viewOn={permissions.viewOn}
                  editOn={permissions.editOn}
                />
              </Box>
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
        >
          <Typography color="primary" variant="h6">
            Leave Board{" "}
          </Typography>
        </Button>

        <Button
          variant="contained"
          color="warning"
          sx={{
            width: "20%",
            borderRadius: "50px",
            border: "1px solid #68390D",
          }}
        >
          <Typography color="primary" variant="h6">
            Delete Board{" "}
          </Typography>
        </Button>
      </Box>
    </Container>
  );
}
