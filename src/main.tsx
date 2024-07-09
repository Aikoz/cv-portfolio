import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';



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

      <App />
  </React.StrictMode>,
)
