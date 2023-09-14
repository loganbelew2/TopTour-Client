import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import "./NavBar.css";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#19857b",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#19857b",
  "&:hover": {
    color: "#90CAF9",
  },
}));

const StyledLinkWhite = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "white",
  "&:hover": {
    color: "#90CAF9",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  "&:hover": {
    color: "#90CAF9",
  },
}));

export const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("tt_token") !== null;
  

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuList = (
    <List>
      <ListItem
        component={StyledLink}
        to="/home"
        onClick={toggleDrawer(false)}
        sx={{ "&:hover": { background: "none" } }}
      >
        <ListItemText primary="Home" />
      </ListItem>
      {!isLoggedIn && (
        <>
          <ListItem
            component={StyledLink}
            to="/login"
            onClick={toggleDrawer(false)}
            sx={{ "&:hover": { background: "none" } }}
          >
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem
            component={StyledLink}
            to="/register"
            onClick={toggleDrawer(false)}
            sx={{ "&:hover": { background: "none" } }}
          >
            <ListItemText primary="Register" />
          </ListItem>
        </>
      )}
      {isLoggedIn && (
        <ListItem
          component={StyledLink}
          to="/login"
          onClick={() => {
            toggleDrawer(false)();
            localStorage.removeItem("tt_token");
          }}
          sx={{ "&:hover": { background: "none" } }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      )}
    </List>
  );

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <StyledLinkWhite  to="/home">
          <FlightOutlinedIcon />
        </StyledLinkWhite>
        <div style={{ flexGrow: 1 }} />
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {menuList}
        </Drawer>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
