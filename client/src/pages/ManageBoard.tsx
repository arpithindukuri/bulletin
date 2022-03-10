import { Typography, Container, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import MemberPermissions from "../components/MemberPermissions";
import MemberStatus from "../components/MemberStatus";
import avatar from "../imgs/avatar.jpg";

interface Props {
  name: string;
}

export default function ManageBoard({ name }: Props) {
  const mockMemberInfo = [
    { id: 1, name: "Liane Doe", email: "liane.doe@gmail.com", role: "Admin" },
    { id: 2, name: "Dad Doe", email: "dad.doe@gmail.com", role: "Admin" },
    { id: 3, name: "Logan Doe", email: "logan.doe@gmail.com", role: "Member" },
    { id: 4, name: "Aly Doe", email: "aly.doe@gmail.com", role: "Member" },
  ];

  const permissionHeaders = [
    { id: 1, name: "Notes", viewOn: true, editOn: false },
    { id: 2, name: "Lists", viewOn: true, editOn: true },
    { id: 3, name: "Expenses", viewOn: false, editOn: false },
    { id: 4, name: "Calendar", viewOn: true, editOn: false },
    { id: 5, name: "Personal Reminders", viewOn: true, editOn: true },
  ];

  return (
    <Container maxWidth={false} sx={{}}>
      {/* Change to type */}
      <a href="/" style={{ textDecorationColor: "rgba(104, 57, 13, 0.54)" }}>
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="left"
          sx={{ pt: "1vh" }}
        >
          Back to {name} Board - Main
        </Typography>
      </a>

      <Box sx={{ pt: "5vh" }}>
        <Box
          sx={{ maxHeight: "8%" }}
          justifyItems="left"
          textAlign="left"
          display="flex"
          justifyContent="start"
        >
          <Box
            width={"25%"}
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            sx={{ pr: "10%" }}
          >
            {/* For the board image */}
            <img
              src={avatar}
              style={{ borderRadius: "100%", minWidth: "100px" }}
              width="25%"
            ></img>
            <Button
              sx={{ display: "block", alignItems: "center", margin: "auto" }}
            >
              <Typography
                variant="subtitle1"
                color="primary.light"
                sx={{ pt: "1vh", textDecoration: "underline" }}
              >
                Change Board Picture
              </Typography>
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="45%"
            justifyContent={"center"}
            paddingTop="2%"
          >
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
                margin: "auto",
                justifyContent: "left",
                marginLeft: "0",
                marginTop: "0",
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary.light"
                align="left"
                sx={{ pt: "1vh", textDecoration: "underline" }}
              >
                Rename Board
              </Typography>
            </Button>
          </Box>
          <Box
            width={"20%"}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            marginRight={"10%"}
          >
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

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent="center"
        alignItems={"center"}
        paddingTop="5px"
        paddingBottom={"5px"}
      >
        <Box width={"20%"}>
          <Typography color="primary" variant="h6">
            Invite New Member{" "}
          </Typography>
        </Box>
        <Box width={"30%"}>
          <TextField
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
              Send Invite{" "}
            </Typography>
          </Button>
        </Box>
      </Box>

      <hr style={{ color: "rgb(104, 57, 13, 0.2)", borderWidth: "0.5px" }}></hr>

      <Box paddingLeft={"10%"} paddingRight={"10%"} paddingBottom="20px">
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
                color="primary"
                variant="subtitle2"
                textAlign={"left"}
                display="inline"
              >
                Name
              </Typography>
            </Box>

            <Box textAlign={"left"} paddingLeft="20px" width="40%">
              <Typography
                color="primary"
                variant="subtitle2"
                textAlign={"left"}
                display="inline"
              >
                Email
              </Typography>
            </Box>

            <Box textAlign={"left"} paddingLeft="20px" width="25%">
              <Typography
                color="primary"
                variant="subtitle2"
                textAlign={"left"}
                display="inline"
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

      <Box paddingLeft={"10%"} paddingRight={"10%"} paddingBottom="20px">
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
            <Box
              display="flex"
              flexDirection={"row"}
              alignItems="center"
              height="60px"
            ></Box>

            <Box
              height="50px"
              justifyContent={"center"}
              display="flex"
              flexDirection={"row"}
              alignItems="center"
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

            <Box
              height="50px"
              display="flex"
              flexDirection={"row"}
              alignItems="center"
            >
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

      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"space-between"}
        paddingLeft="20px"
        paddingRight={"20px"}
        paddingBottom="30px"
        paddingTop={"20px"}
      >
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
