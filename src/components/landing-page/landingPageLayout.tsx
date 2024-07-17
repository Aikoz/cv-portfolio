import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import backgroundImage from '../../assets/fondo2.jpg';
import LandingTopBar from '../general-reusable-components/landingTopBar';

const drawerWidth = '20vw';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: '145px',
  width: `100%`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: '0.3s',
  }),
  marginLeft: 0,
  ...(open && {

    width: `calc(98vw - ${drawerWidth})`,
    marginLeft: `calc(${drawerWidth} + 2vw)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: '0.4s',
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



export function LandingPageLayout({ setIsLoggedIn,
  isLoggedIn,
  sharedTitle,
  setSharedTitle,
  setLoading }: any) {


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

    // const direccion = window.localStorage.getItem('path')

    setOpen(false);
  };

  useEffect(() => {

  }, [])

  return (
    <Box sx={{
      maxWidth: '100vw',
      height: '100vh', // O ajusta la altura según tus necesidades
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginLeft: '0px',
      overflow: 'scroll'
    }}>

      <LandingTopBar handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth} open={open} closeSession={handleLogout} sharedTitle={sharedTitle}></LandingTopBar>


      <Drawer
        sx={{
          width: drawerWidth,
          zIndex: 1299,

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
            borderRadius: '0.5rem', // descomentarlo si se necesita
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
            <IconButton onClick={() => (handleDrawerClose(''))} style={{ color: "white", width: '45px', height: '45px' }}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Typography
              variant="h6"
              // noWrap
              sx={{
                fontFamily: 'Libre Franklin, Arial, sans-serif',
                fontWeight: '800',
                fontSize: '20px',
                width: '100%',
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
          </ListItem> */}

        </List>
      </Drawer>

      <Main open={open} >
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}

        <Card variant="outlined" sx={{
          maxWidth: '96%', minHeight: '14.25vh',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          backgroundColor: 'rgba(9, 9, 9, 0.65)',
          //backgroundColor: 'rgba(9, 9, 9, 0.65)',
          border: '1px solid rgba(36, 28, 28, 0.125)',
          color: '#ffffffdd',
          flex: '1 1 auto',
          fontSize: '1.15em',
          borderRadius: '0.5rem',
          margin: '0% 2% 0% 2%'
        }}
        >
          <Box >
            <Box sx={{ p: 1, backgroundColor: 'transparent', borderRadius: 1, color: "black" }}>

              <Outlet context={{ setSharedTitle, setLoading }} />

            </Box>
          </Box>
        </Card>
        {/* </LocalizationProvider> */}
      </Main>

    </Box>
  )
}