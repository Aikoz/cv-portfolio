import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import BrandImg from '../../assets/whiteblack.png'
import { green } from '@mui/material/colors';

export default function LandingTopBar(props: any) {
  const {handleDrawerOpen, open, closeSession, drawerWidth} = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile   </MenuItem>
      <MenuItem onClick={closeSession}>Cerrar sesión    </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, 
      position: 'fixed',
      zIndex: 1300, 
      marginLeft: open ? `calc(${drawerWidth} + 0.9vw)` : '0vw', 
      width: open ? `calc(96.5vw - (${drawerWidth}))` : '97.4vw' ,
      transition: `width 0.2s ease, margin 0.2s ease`,
    }}>
      <AppBar 
        position="relative" 
        sx={{ backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0)',
        // border: '1px solid rgba(36, 28, 28, 0.125)',
        color: '#ffffffdd',
        flex: '1 1 auto',
        padding: '1rem',
        fontSize: '1.15em',
        lineHeight: '1.5em',
        borderRadius: '0.5rem', // descomentarlo si se necesita
        margin: '1rem', // descomentarlo si se necesita
        }}>

        <Toolbar    sx={{ // descomentarlo si se necesita
        margin: '1px', // descomentarlo si se necesita
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: open ? 0 : 3,                 
              transition: 'width 0.9s ease',
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              height:'80px', 
              width: open ? 0 : '80px', 
              overflow:'hidden'}}
          >
            <MenuIcon sx={{                 
              transition: 'width 0.9s ease',

              width: open ? 0 : '80px', 
              }} />
          </IconButton>

          <img
                src={BrandImg}
                alt="Logotipo de la aplicacion"
                loading="lazy"
                style={{height: "80px", 
                marginRight: "35px", 
                transition: 'width 0.5s ease',
                // width: open?'0px':'125px',
                borderRadius:'5px'}}
             />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none',
                             sm: 'block',
                             fontFamily: 'Libre Franklin, Arial, sans-serif',
                             fontWeight: '600', 
                             fontSize: '45px' }}}
            >
            Bienvenido.
            
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                height:'40px', 
                width:  '40px', }}
              
            >
              <AccountCircle sx={{
                height:'40px', 
                width:  '40px', }}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}