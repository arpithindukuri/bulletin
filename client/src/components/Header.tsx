// IMPORTING APIS
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  tabs: {
    width: "100%",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuButtonClick = (link: string) => {
    setAnchor(null);
    navigate(link);
  };

  return (
    <AppBar position="static" style={{ background: "#F0E6DB" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className={classes.title}
          sx={{
            mr: 2,
            color: "#534029",
            display: { xs: "none", md: "flex" },
          }}
        >
          BULLETIN
        </Typography>
        {isMobile ? (
          <div>
            <IconButton
              color="inherit"
              edge="start"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={() => {
                setAnchor(null);
              }}
            >
              <MenuItem onClick={() => handleMenuButtonClick("/home")}>
                <Typography variant="h6">Main</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleMenuButtonClick("/login")}>
                <Typography variant="h6">Log In</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleMenuButtonClick("/signup")}>
                <Typography variant="h6">Sign Up</Typography>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div style={{ marginRight: "2rem" }}>
            <Button
              variant="text"
              color="default"
              onClick={() => navigate("/home")}
            >
              Main
            </Button>
            <Button
              variant="text"
              color="default"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              variant="text"
              color="default"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
