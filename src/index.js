import './index.css';
import {TopTour} from './TopTour';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material'; 
import { colors } from '@mui/material'; 


const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: colors.red.A400,
    },
  },
});

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
<ThemeProvider theme = {theme}>
  <BrowserRouter>
    <TopTour/>
  </BrowserRouter>  
</ThemeProvider>
);


