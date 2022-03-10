// IMPORTING APIS
import React from "react";
import { AppBar, Toolbar, IconButton, useMediaQuery, Button, Menu, MenuItem, ListItemIcon} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// REACT APP IMPORTS
import LogIn from "../pages/Login";
import SignIn from "../pages/Signin";
//The local styling used here 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  tabs: {
    width: '100%'
  }
}));

const Header = () => {
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <BrowserRouter>
          <AppBar position="static"  style={{ background: '#F0E6DB' }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                className={classes.title}
                sx={{ mr: 2, color: '#534029', display: { xs: 'none', md: 'flex' } }}
              >
                BULLETIN
              </Typography>
              {isMobile ? (
                <>
                  <IconButton
                    color="inherit"
                    className={classes.menuButton}
                    edge="start"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchor}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                  >
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/login"
                    >
                      <Typography variant="h6">Main</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/login"
                    >
                      <Typography variant="h6">Log In</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/login"
                    >
                      <Typography variant="h6">Sign Up</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div style={{ marginRight: "2rem" }}>
                  <Button
                    variant="text"
                    color="default"
                    component={Link}
                    to="/login"
                  >
                    Main
                  </Button>
                  <Button
                    variant="text"
                    color="default"
                    component={Link}
                    to="/login"
                  >
                    Log In
                  </Button>
                  <Button
                    variant="text"
                    color="default"
                    component={Link}
                    to="/login"
                  >
                   Sign Up
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/login" element={LogIn} />
            <Route path="/signin" element={SignIn} />
          </Routes>
          </BrowserRouter>
    </div>
  );
};

export default Header;