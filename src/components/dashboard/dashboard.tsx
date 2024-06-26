import { Route, Routes, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Button, Card, Grid, Stack } from '@mui/material';
import TopBar from './topBar/topBar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DashboardOutlined, FactCheckOutlined, NotificationsNone, SendAndArchive, SummarizeOutlined } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import backgroundImage from '../../assets/fondo1.jpg';
import { useOutletContext } from "react-router-dom";


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface OutletContextType {
  setSharedTitle: Dispatch<SetStateAction<string>>;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'left',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));




export function Dashboard({ setIsLoggedIn, isLoggedIn, sharedTitle, setSharedTitle }: any) {


  const location = useLocation();

  useEffect(() => {
    // Guardar la URL actual en localStorage
    if (isLoggedIn) {
      localStorage.setItem('lastVisitedPath', location.pathname + location.search);
    }
  }, [location, isLoggedIn]);



  const theme = useTheme();
  const navigate = useNavigate();


  useEffect(() => {
    // Al cargar la aplicación, redirigir a la URL guardada si existe
    const lastVisitedPath = localStorage.getItem('lastVisitedPath');
    if (isLoggedIn && lastVisitedPath && lastVisitedPath !== '/') {
      window.history.replaceState(null, '', lastVisitedPath);
      navigate(lastVisitedPath);

    }
  }, [isLoggedIn]);
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setIsLoggedIn(false);
    navigate('/');
  };


  function handleDrawerClose(path: string) {
    path != '' ? window.localStorage.setItem('path', path) : console.dir('')

    const direccion = window.localStorage.getItem('path')

    setOpen(false);
  };

  useEffect(() => {
    navigate('/dashboard/homePage');
  }, [])



  return (
    <Box sx={{
      maxWidth: "100vw",
      position: 'relative',
      width: '100%',
      height: '100vh', // O ajusta la altura según tus necesidades
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>


      <AppBar position="fixed" open={open}>
        <Toolbar>

          <Typography variant="h6" noWrap component="div">
          </Typography>
        </Toolbar>
        <TopBar handleDrawerOpen={handleDrawerOpen} open={open} closeSession={handleLogout}></TopBar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => (handleDrawerClose(''))} style={{ color: "white", width: '60px', height: '60px' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <img
            src={`https://content.app-sources.com/s/63971701313286236/uploads/Images/Ciudad_Maderas_Terrenos_Premium_logo2-8587963.png`}
            alt="Logotipo de la aplicacion"
            loading="lazy"
            style={{
              height: "40px",
              marginRight: "15px"
            }} />

        </DrawerHeader>
        <Divider />
        <List>

          <ListItem key={"Dashboard"} disablePadding>
            <ListItemButton component={Link} to="/dashboard/homePage" onClick={() => (handleDrawerClose("/dashboard/homePage"))}>
              <ListItemIcon>
                <SendAndArchive />
              </ListItemIcon>
              <ListItemText primary={"Envios"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"NotificationAdmin"} disablePadding>
            <ListItemButton component={Link} to="/dashboard/notificationAdmin" onClick={() => (handleDrawerClose("/dashboard/notificationAdmin"))}>
              <ListItemIcon>
                <NotificationsNone />
              </ListItemIcon>
              <ListItemText primary={"Administrador de plantillas"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Proyectos"} disablePadding>
            <ListItemButton component={Link} to="/dashboard/proyectos" onClick={() => (handleDrawerClose("/dashboard/proyectos"))}>
              <ListItemIcon>
                <FactCheckOutlined />
              </ListItemIcon>
              <ListItemText primary={"Proyectos"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Criterios"} disablePadding>
            <ListItemButton component={Link} to="/dashboard/criterios" onClick={() => (handleDrawerClose("/dashboard/criterios"))}>
              <ListItemIcon>
                <SummarizeOutlined />
              </ListItemIcon>
              <ListItemText primary={"Criterios"} />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      <Main open={open} style={{ paddingTop: '85px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <Card variant="outlined" sx={{ maxWidth: '100vw', minHeight: '50vh', borderRadius: 3 }}>

            <Box sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography gutterBottom variant="h5" component="div">
                  {sharedTitle}
                </Typography>
                {/* <Typography gutterBottom variant="h6" component="div">
          $4.50
        </Typography> */}
              </Stack>
            </Box>

            <Box sx={{ p: 2 }}>
              <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 1, color: "black" }}>

                <Outlet context={{ setSharedTitle }} />

              </Box>
            </Box>
          </Card>
        </LocalizationProvider>
      </Main>

    </Box>

  );
}

