import React, { useState } from "react";
import {
  Drawer,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    width: 250,
  },
  logo: {
    width: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "70px",
  },
  drawerTitle: {
    color: "#68390D",
    marginLeft: "auto",
    marginRight: "auto",
  },
  listItemActive: {
    background: "#ecd1c5",
  },
  listItemTextActive: {
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
  },
  listItemText: {
    color: "#68390D",
    display: "flex",
    justifyContent: "center",
  },
  drawerPaper: {
    width: 250,
    background: "#CBDAE1",
  },
  ListContainer: {
    marginTop: 20,
  },
  drawerButton: {
    position: "absolute",
    top: "50%",
    zIndex: theme.zIndex.drawer - 1,
  },
}));

const listLinks = [
  {
    name: "My Profile",
    path: "/profile",
  },
  {
    name: "Account Information",
    path: "/account-info",
  },
  {
    name: "Personalization",
    path: "/personalization",
  },
  {
    name: "Groups",
    path: "/groups",
  },
  {
    name: "Support Us",
    path: "/support-us",
  },
];

const SideDrawer: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <IconButton
        className={classes.drawerButton}
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <ArrowForwardIosIcon style={{ color: "#68390D" }} fontSize="large" />
      </IconButton>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
      >
        <img className={classes.logo} src={Logo} />
        <h1 className={classes.drawerTitle}>My Profile</h1>
        <div className={classes.ListContainer} />
        <List>
          {listLinks.map((obj, idx) => (
            <ListItem
              button
              key={idx}
              className={
                location.pathname == obj.path ? classes.listItemActive : ""
              }
              onClick={() => navigate(obj.path)}
            >
              <ListItemText
                primary={obj.name}
                className={
                  location.pathname == obj.path
                    ? classes.listItemTextActive
                    : classes.listItemText
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideDrawer;
