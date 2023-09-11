import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system"; 
import "./NavBar.css";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#19857b",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const StyledLink = styled(Link)(({ theme }) => ({
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

  const handleLogout = () => {
    localStorage.removeItem("tt_token");
    navigate("/login");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {(localStorage.getItem("tt_token") !== null) ? (
          <StyledButton onClick={handleLogout}>
            Logout
          </StyledButton>
        ) : (
          <>
            <StyledLink to="/login">
              <StyledButton>Login</StyledButton>
            </StyledLink>
            <StyledLink to="/register">
              <StyledButton>Register</StyledButton>
            </StyledLink>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};
