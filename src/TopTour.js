import styled from '@emotion/styled';
import { NavBar } from './components/nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#19857b",
  "&:hover": {
    color: "#90CAF9",
  },
}));
export const TopTour = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return <>
    <NavBar/>
    <ApplicationViews StyledLink = {StyledLink}/>
  </>
}
