import { Box, Checkbox, Typography } from "@mui/material";

interface Props {
  name: string;
  viewOn: boolean;
  editOn: boolean;
}

//Member Permissions Checkboxes on Manage Board - Title + View + Edit
export default function MemberPermissions({ name, viewOn, editOn }: Props) {
  return (
    <>

      <Box height={"60px"} textAlign="center">
        <Typography color={"primary"} variant="subtitle1" fontWeight={"bold"}>
          {name}
        </Typography>
      </Box>

      <Box
        height="50px"
        display={"flex"}
        flexDirection="row"
        alignItems={"center"}
        justifyContent="center"
      >
        <Checkbox defaultChecked={viewOn} />
      </Box>

      <Box
        height="50px"
        display={"flex"}
        flexDirection="row"
        alignItems={"center"}
        justifyContent="center"
      >
        <Checkbox defaultChecked={editOn} />
      </Box>
    </>
  );
}
