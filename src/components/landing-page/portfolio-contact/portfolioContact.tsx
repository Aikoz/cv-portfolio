import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
import CyberpunkTypography from "../../../utils/cyberpunkTypography";
import { styled } from '@mui/system';

interface OutletContextType {
  setSharedTitle: (title: string) => void;
  setLoading: (title: boolean) => void;
}

const BackgroundVideo = styled('video')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
  marginTop:'-0px',
  marginLeft:'-0px',
  opacity: 0.1, // Opacidad del 20%
});

export function PortfolioContact() {
  const { setSharedTitle, setLoading } = useOutletContext<OutletContextType>();
  useEffect(() => {
    setSharedTitle('Contact');
    setLoading(false);

  }, [])

  return (
    <Box> 
      <BackgroundVideo autoPlay loop muted>
        <source src="https://cdn.pixabay.com/video/2021/09/27/89894-616430996_large.mp4" type="video/mp4" />
        {/* Puedes agregar más formatos de video si es necesario */}
      </BackgroundVideo>
      <Grid container direction='row' spacing={{ xl: 2, md: 2 }}>
        
      <Grid item md={2} xl={2} >

      </Grid>
      <Grid item md={10} xl={10}>
      <CyberpunkTypography>_.    -'</CyberpunkTypography>
        <Typography
          sx={{
            fontFamily: 'Libre Franklin, Arial, sans-serif',
            fontWeight: '400',
            fontSize: '30px',
            width: '100%',
            mt: 2,
            color: 'lightgray',
          }} >{'Email:'}</Typography>

        {/* pharagraphs::::::::::::::::::::::::::::::::::::: */}

        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Libre Franklin, Arial, sans-serif',
            fontWeight: '200',
            fontSize: '17px',
            width: 'auto',
            color: 'white',
            marginBottom: '45px'
          }}
        >
          aikoz_1@live.com
        </Typography>
        <Link

          to="/landingPage/portfolioHome/"
          style={{ textDecoration: 'none', color: 'lightgray' }}
        >
          <GlitchTypography text={'Go back home →'} />
        </Link>
      </Grid>
    </Grid>
    </Box>
    

  )

}