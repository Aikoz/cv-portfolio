import { Box, Card, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { Children } from "react";
import { Link, Outlet } from "react-router-dom";

interface Props {
  children: React.ReactNode
}

export const Layout = ({ titulo, Props}: any) => {

  return (
 
    <Card variant="outlined" sx={{ maxWidth: '100vw', minHeight: '50vh', borderRadius: 3 }}>

      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {titulo}
          </Typography>
        </Stack>
      </Box>
      <Grid container xs={12}>



      <Grid item xs={12}>


          <Box sx={{ p: 2 }}>
            <Box sx={{ p: 2, height: '100vh', backgroundColor: 'white', borderRadius: 1, color: "black" }}>
              
              <Outlet />

            </Box> 
          </Box>
          </Grid>
        </Grid>
    </Card>
  );
};

export default Layout;