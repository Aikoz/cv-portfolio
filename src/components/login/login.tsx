// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Card, Grid, Paper, FormControl, Box, OutlinedInput, InputAdornment, IconButton, InputLabel, Tab } from '@mui/material';
import { FormEvent } from 'react'
import { sha256 } from '../../utils/encoder-helper'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RainCanvas from '../canvas/rain';
import backgroundImage from '../../assets/fondo1.jpg';
import { server } from '../../utils/constants';

const Login = ({ setIsLoggedIn }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function handleLogin(event: FormEvent<HTMLFormElement>) {


    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const token = "token"
    const deviceId = "deviceid"
    const encodedpass = password as string
    const sha256Pass = await sha256(encodedpass);

    setLoading(true);

    const response = await fetch(server.dev_url +'/login', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, password: sha256Pass, token, deviceId }),

    }).then((response) => {

      if (!response.ok) {
        alert("Error desconocido.");
      }

      return response.json()

    })
      .then((data) => {
        setLoading(false);
        if (data[0].code) {

          localStorage.setItem('user', JSON.stringify({ username }));
          setIsLoggedIn(true);
          navigate('/landingPage/portfolioHome/');

        } else {
          alert(data[0].message);

        }



      });
  };

  return (

    <Container style={{
      //backgroundColor: "black", 
      color: "black",
      display: 'flex',
      maxWidth: "100vw",
      position: 'relative',
      width: '100%',
      height: '100vh', // O ajusta la altura según tus necesidades
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Box p={5}>
      <Grid
        container
        direction="row"
        justifyContent="flex"
        alignItems="center"
      >

        {/* First Horizontal Section */}

        <Grid item xs={12} padding={1}>
          <Card sx={{ ml: 55, mr: 55, borderRadius: '35px' }}>
            <Box sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ m: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="overline" align="center" gutterBottom sx={{ fontSize: '15px' }}>
                  Administrador de notificaciones
                </Typography>
                <Tab
                  sx={{

                    height: '50px',
                    width: '100%',

                  }}
                  label={
                    <div>

                      <Typography variant="overline">
                        Gestor de notificaciones push
                      </Typography>

                    </div>
                  }
                />

              </Box>
              <img
                src={`https://content.app-sources.com/s/63971701313286236/uploads/Images/Ciudad_Maderas_Terrenos_Premium_logo2-8587963.png`}
                alt="Logotipo de la aplicacion"
                loading="lazy"
                style={{ height: "90px", margin: 'auto' }}
              />
            </Box>


          </Card>

        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={6} p={5} >
            <Paper sx={{ borderRadius: '35px'}} >
              <Box padding={5} component="form" onSubmit={handleLogin} sx={{gap:'5px', borderRadius: '35px'}}>

                <Typography variant="h6">Ingresa tus credenciales</Typography>

                <InputLabel htmlFor="outlined-adornment-password">Usuario</InputLabel>

                <TextField
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label=""
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  style={{ marginBottom: '30px' }}
                  label="Contraseña"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Iniciar sesión
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6} p={5} >
            <Paper sx={{ borderRadius: '35px'}}>
              <Box padding={5} >
                <Typography variant="h6"></Typography>

                <Card sx={{p:'auto', margin:'auto', alignContent:'center', alignItems:'center' }}>

                  <iframe
                    src="https://www.youtube.com/embed/VTmCjrXw_oI"
                    height={370}
                    width={550}
                    
                  />

                </Card>
              </Box>
            </Paper>
          </Grid>

        </Grid>

      </Grid>
      </Box>
    </Container>
  );
};

export default Login;