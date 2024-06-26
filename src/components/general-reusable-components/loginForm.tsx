import { Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { sha256 } from "../../utils/encoder-helper";
import { server } from '../../utils/constants';
import { useNavigate } from "react-router-dom";


export function LoginForm({ setIsLoggedIn }: any){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
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
            if (data[0].code) {
    
              localStorage.setItem('user', JSON.stringify({ username }));
              setIsLoggedIn(true);
              navigate('/landingPage/portfolioHome/');
    
            } else {
              alert(data[0].message);
    
            }
    
    
    
          });
      };        
    return(
        <>
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
        
        </>
    )
}