import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
import CyberpunkTypography from "../../../utils/cyberpunkTypography";
import pdfFile from '../../../assets/resume.pdf'; // Asegúrate de cambiar la ruta al archivo PDF



interface OutletContextType {
  setSharedTitle: (title: string) => void;
  setLoading: (title: boolean) => void;
}

export function PortfolioCV() {

  const { setSharedTitle, setLoading } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setSharedTitle('Resumé');
  }, [])



  return (
    <Stack p={10}>
      <Grid container direction='row' spacing={{ xl: 2, md: 5 }}>

        <Grid item md={12} xl={10} >
          <Stack >

            
          <CyberpunkTypography>About my working experience:</CyberpunkTypography>


            <Box sx={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              border: 'solid #fff 1px',
              borderRadius: '5px'
            }}>

              <iframe
                src={pdfFile} // Ensure this is accessible from the public folder
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </Box>





          </Stack>

        </Grid>


      </Grid>

      <Link

        to="/landingPage/portfolioHome/"
        style={{ textDecoration: 'none', color: 'lightgray' }}
      >
        <GlitchTypography text={'Go back home →'} />
      </Link>
    </Stack>



  )

}