import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function MockFooter() {
 
  return (
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" color="secondary" >
        <Toolbar>
          <Typography color='primary' align='left' variant="h6" sx={{ flexGrow: 1 }}>
            BULLETIN
          </Typography>
          <Button color='primary'>Board</Button>
          <Button color='primary'>Notes</Button>
          <Button color='primary'>Profile</Button>
          <Button color='primary'>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
