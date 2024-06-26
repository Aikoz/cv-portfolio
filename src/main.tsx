import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider, AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, Divider, Drawer, IconButton } from '@mui/material';



const theme = createTheme({
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: { main: 'rgb(102, 157, 246)' },
    background: { paper: 'rgb(5, 30, 52)' },
  },
  typography: {
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
