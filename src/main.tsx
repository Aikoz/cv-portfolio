import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import ReactGA from 'react-ga';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


ReactGA.initialize('G-HS4LWVLH5S');

// Realiza un seguimiento de la página vista en cada carga
ReactGA.pageview(window.location.pathname + window.location.search);
// let theme = createTheme()
// theme = createTheme({
//   components: {
//   },
//   palette: {
//   },
//   typography: {
//     subtitle1: {
//       fontFamily: 'Libre Franklin, Arial, sans-serif',
//       fontWeight: '200',
//       width: '100%',
//       color: 'lightgray',
//       [theme.breakpoints.between("xs", "md")]: {
//         fontSize: "12px", 
//         lineHeight: "15px", 
//       },
//       [theme.breakpoints.between("md", "xl")]: {
//         fontSize: "20px",
//         lineHeight: "2rem", 
//       },
//     },
//   }
// });
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}

      <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>,
)
