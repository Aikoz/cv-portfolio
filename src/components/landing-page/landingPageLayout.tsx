import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Card, Box, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ContactWidget } from './reusable-components/contactWidget';
import backgroundImage from '../../assets/fondo2.jpg';
import LandingTopBar from '../general-reusable-components/landingTopBar';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const drawerWidth = '20vw';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: '0px',
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
    if (isLoggedIn) {
      localStorage.setItem('lastVisitedPath', location.pathname + location.search);
    }
  }, [location, isLoggedIn]);

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
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
    window.localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };
  function handleDrawerClose(path: string) {
    if (path !== '') {
      window.localStorage.setItem('path', path);
    }
    setOpen(false);
  };

  const boxRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (boxRef.current) {
          setTimeout(() => {
      boxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 100); 
    
    }
  }, [pathname]);

  return (
    <Box sx={{
      maxWidth: '100vw',
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginLeft: '0px',
      overflow: 'scroll',
      position: 'relative'
    }}>
      {/* Barra superior */}
      <LandingTopBar
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
        open={open}
        closeSession={handleLogout}
        sharedTitle={sharedTitle}
      />

      {/* Drawer lateral */}
      <Drawer
        sx={{
          width: drawerWidth,
          zIndex: 1299,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            height: '97vh',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: 'rgba(17, 25, 40, 0.65)',
            border: '1px solid rgba(36, 28, 28, 0.125)',
            color: '#ffffffdd',
            padding: '1rem',
            fontSize: '1.15em',
            borderRadius: '0.5rem',
            margin: '1rem',
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ color: "white", width: '95%', height: '110px' }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', width: '100%'
          }}>
            <IconButton onClick={() => handleDrawerClose('')} style={{ color: "white", width: '45px', height: '45px' }}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Libre Franklin, Arial, sans-serif',
                fontWeight: '800',
                fontSize: '20px',
                width: '100%',
                textAlign: 'center'
              }}
            >
              Content
            </Typography>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Main open={open} ref={boxRef}>
        <br />
        <DrawerHeader />

        <DrawerHeader />
        <br />

        <Card variant="outlined" sx={{
          maxWidth: '96%',
          minHeight: '14.25vh',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          backgroundColor: 'rgba(9, 9, 9, 0.65)',
          border: '1px solid rgba(36, 28, 28, 0.125)',
          color: '#ffffffdd',
          fontSize: '1.15em',
          borderRadius: '0.5rem',
          margin: '0% 2% 0% 2%'
        }}>
          <Box>
            <Box sx={{ p: 1, backgroundColor: 'transparent', borderRadius: 1 }}>
              <Outlet context={{ setSharedTitle, setLoading }} />
            </Box>
          </Box>
        </Card>
        <br />
        <br />
      </Main>


      <ContactWidget></ContactWidget>


    </Box>
  );
}
