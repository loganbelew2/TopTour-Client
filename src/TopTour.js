import styled from '@emotion/styled';
import { NavBar } from './components/nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "#19857b",
  "&:hover": {
    color: "#90CAF9",
  },
}));
export const TopTour = () => {
  return <>
    <NavBar/>
    <ApplicationViews StyledLink = {StyledLink}/>
  </>
}
