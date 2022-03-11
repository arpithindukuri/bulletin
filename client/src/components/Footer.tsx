// IMPORTING APIS
import React from "react";
import { AppBar, Toolbar, IconButton, useMediaQuery, Button, Menu, MenuItem, ListItemIcon} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// REACT APP IMPORTS
import LogIn from "../pages/Login";
import SignUn from "../pages/Signup";
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

const Footer = () => (
    <div className="footer">
      <p>Footer Content will go in here</p>
    </div>
  );
  
  export default Footer;