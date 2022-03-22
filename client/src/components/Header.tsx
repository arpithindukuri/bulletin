// IMPORTING APIS
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useTypedDispatch } from "../hooks/ReduxHooks";
import { userSignedOut } from "../actions/UserActions/UserActionCreator";
import { useTypedSelector } from "../hooks/ReduxHooks";
import { selectUserData } from "../actions/UserActions/UserSelector";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#F0E6DB",
  },
  title: {
    flexGrow: 1,
  },
  tabs: {
    width: "100%",
  },
  buttonActive: {
    borderTop: "5px solid white",
  }
}));

const Header = () => {
  const userData = useTypedSelector(selectUserData);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useTypedDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const unauthenticatedPaths = [
    {
      name: "Main",
      function: () => {
        setAnchor(null);
        navigate("/");
      },
      path: "/",
    },
    {
      name: "Log In",
      function: () => {
        setAnchor(null);
        navigate("/login");
      },
      path: "/login",
    },
    {
      name: "Sign Up",
      function: () => {
        setAnchor(null);
        navigate("/signup");
      },
      path: "/signup",
    },
  ];

  const authenticatedPaths = [
    {
      name: "Boards",
      function: () => {
        setAnchor(null);
        navigate("/boards");
      },
      path: "/boards",
    },
    {
      name: "Notes",
      function: () => {
        setAnchor(null);
        navigate("/notes");
      },
      path: "/notes"
    },
    {
      name: "dashboard",
      function: () => {
        setAnchor(null);
        navigate("/account-info");
      },
      path: "/account-info"
    },
    {
      name: "logout",

      function: () => {
        setAnchor(null);
        dispatch(userSignedOut());
        localStorage.removeItem("root");
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        navigate("/login");
      },
      path: "/logout"
    },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuButtonClick = (link: string) => {
    setAnchor(null);
    navigate(link);
  };

  useEffect(() => {
    if (!userData?.id || !localStorage.getItem("refresh")) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [userData]);

  if (authenticated === null) return <div />;

  return (
    <AppBar position="static" className={classes.appBar}>
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
            fontWeight: "bold",
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
              {authenticated ? (
                <>
                  {authenticatedPaths.map((item, idx) => (
                    <MenuItem key={idx} onClick={item.function}>
                      <Typography variant="h6">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </>
              ) : (
                <>
                  {unauthenticatedPaths.map((item, idx) => (
                    <MenuItem key={idx} onClick={item.function}>
                      <Typography variant="h6">{item.name}</Typography>
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>
          </div>
        ) : (
          <div style={{ marginRight: "2rem" }}>
            {authenticated ? (
              <>
                {authenticatedPaths.map((item, idx) => (
                  <Button
                    key={idx}
                    variant="text"
                    color="default"
                    onClick={item.function}
                    className={item.path == location.pathname ? classes.buttonActive : ""}
                  >
                    {item.name}
                  </Button>
                ))}
              </>
            ) : (
              <>
                {unauthenticatedPaths.map((item, idx) => (
                  <Button
                    key={idx}
                    variant="text"
                    color="default"
                    onClick={item.function}
                    className={item.path == location.pathname ? classes.buttonActive : ""}
                  >
                    {item.name}
                  </Button>
                ))}
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
