import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
import CyberpunkTypography from "../../../utils/cyberpunkTypography";



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
          <Stack spacing={5} justifyItems={"center"} >

            
          <CyberpunkTypography>About my working experience:</CyberpunkTypography>


            {/* <Box sx={{
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
            </Box> */}
                                  <Stack spacing={5} alignItems={"center"} justifyContent={"center"} width={"100%"}>            
                                    <iframe src="https://docs.google.com/document/d/1SwDY5lNE9y-4ESJU-H0fbW-VisOemTYg/preview?usp=drive_link&ouid=111872008713938370947&rtpof=true&sd=true" width="80%" height="1100" frameborder="0" allowfullscreen />
</Stack>
  
      




          </Stack>

        </Grid>


      </Grid>

      {/* <Link

        to="/landingPage/portfolioHome/"
        style={{ textDecoration: 'none', color: 'lightgray' }}
      >
        <GlitchTypography text={'Go back home →'} />
      </Link> */}
    </Stack>



  )

}