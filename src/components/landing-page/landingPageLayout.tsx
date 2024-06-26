import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Card, Stack } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import { FactCheckOutlined, NotificationsNone, SendAndArchive, SummarizeOutlined } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import backgroundImage from '../../assets/fondo1.jpg';
import TopBar from '../dashboard/topBar/topBar';
import LandingTopBar from '../general-reusable-components/landingTopBar';
import BrandImg from '../../assets/blackwhite.png'

const drawerWidth = '20vw';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  paddingTop: '145px',
  width: `97% `,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `calc(96.5% - ${drawerWidth})`,
    marginLeft: `calc(${drawerWidth} + 0.5vw)`,
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
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: `${drawerWidth}`,
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



export function LandingPageLayout({ setIsLoggedIn, isLoggedIn, sharedTitle, setSharedTitle }: any) {


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
    // navigate('/landingPage/portfolioHome/');
  }, [])

  return (
    <Box sx={{
      width: '100%',
      height: '100%', // O ajusta la altura según tus necesidades
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      
      <LandingTopBar handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} open={open} closeSession={handleLogout}></LandingTopBar>

    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
            ,
            height: '97vh',

            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: 'rgba(17, 25, 40, 0.65)',
            border: '1px solid rgba(36, 28, 28, 0.125)',
            color: '#ffffffdd',
            flex: '1 1 auto',
            padding: '1rem',
            fontSize: '1.15em',
            lineHeight: '1.5em',
            borderRadius: '1.25rem', // descomentarlo si se necesita
            margin: '1rem', // descomentarlo si se necesita
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ color: "white", width: '95%', height: '110px' }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyItems: 'center', width: '100%'
          }}>
            <IconButton onClick={() => (handleDrawerClose(''))} style={{ color: "white", width: '90px', height: '90px' }}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Typography
              variant="h6"
              // noWrap
              sx={{
                fontFamily: 'Libre Franklin, Arial, sans-serif',
                fontWeight: '600',
                fontSize: '40px',
                width: '70%',
                // backgroundColor:'green',
                textAlign: 'center'
              }}
            >
              Content

            </Typography>
          </Box>

          {/* <img
                src={BrandImg}
                alt="Logotipo de la aplicacion"
                loading="lazy"
                style={{height: "80px", 
                margin: "5px 15px", 
                transition: 'width 0.5s ease',
                borderRadius:'15px'}}
             /> */}


        </DrawerHeader>
        <Divider />
        <List>

          {/* <ListItem key={"Dashboard"} disablePadding>
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
          </ListItem> */}

        </List>
      </Drawer>

      <Main open={open} >
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}

        <Card variant="outlined" sx={{
          maxWidth: '100vw', height: '84.25vh', backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          backgroundColor: 'rgba(17, 25, 40, 0.65)',
          border: '1px solid rgba(36, 28, 28, 0.125)',
          color: '#ffffffdd',
          flex: '1 1 auto',
          padding: '1rem',
          fontSize: '1.15em',
          lineHeight: '1.5em',
          borderRadius: '1.25rem',
          // margin: '1rem'
        }}
        >

          <Box sx={{ p: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              // noWrap
              sx={{
                fontFamily: 'Libre Franklin, Arial, sans-serif',
                fontWeight: '600',
                fontSize: '40px',
                width: '70%',
                // backgroundColor:'green',
                // textAlign: 'center'
              }}
            >

            </Typography>
            
            </Stack>
          </Box>

          <Box sx={{ p: 2 }}>
            <Box sx={{ p: 2, backgroundColor: 'transparent', borderRadius: 1, color: "black" }}>

              <Outlet context={{ setSharedTitle }} />

            </Box>
          </Box>
        </Card>
        {/* </LocalizationProvider> */}
      </Main>

    </Box>
  )
}