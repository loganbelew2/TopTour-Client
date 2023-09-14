import './index.css';
import {TopTour} from './TopTour';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material'; 
import { colors } from '@mui/material'; 
require('dotenv').config();


const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Use the API key
console.log(`API Key: ${apiKey}`);

// You can use apiKey in your API requests or other parts of your code


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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
