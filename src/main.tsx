import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';



let theme = createTheme()
theme = createTheme({
  components: {
    // MuiListItemButton: {
    //   defaultProps: {
    //     disableTouchRipple: true,
    //   },
    // },
  },
  palette: {
    // mode: 'dark',
    // primary: { main: 'rgb(102, 157, 246)' },
    // background: { paper: 'rgb(5, 30, 52)' },
  },
  typography: {
    subtitle1: {
      fontFamily: 'Libre Franklin, Arial, sans-serif',
      fontWeight: '200',
      width: '100%',
      color: 'lightgray',
      [theme.breakpoints.between("xs", "md")]: {
        fontSize: "12px", // 20px
        lineHeight: "15px", //  30px
      },
      [theme.breakpoints.between("md", "xl")]: {
        fontSize: "20px", //24px
        lineHeight: "2rem", // 35px
      },
    },
    // fontFamily: 'Libre Franklin, Arial, sans-serif',
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>

      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
