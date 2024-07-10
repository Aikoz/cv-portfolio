import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Card, CardActionArea, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
// import profileImg from "../../../assets/profileImg.jpg"
// import frontPage from "../../../assets/fondo1.jpg"
import facebook from "../../../assets/facebook.png"
import apple from "../../../assets/appleDeveloper.png"
import instagram from "../../../assets/Instagram.png"
import github from "../../../assets/github.png"
import linkedIn from "../../../assets/LinkedIn.png"
import academia from "../../../assets/academia.png"
import CyberpunkTypography from "../../../utils/glitchLetters";
// import { Delete, EditNote } from "@mui/icons-material";
// import { server } from "../../../utils/constants";
// import { DateFormatter } from '../../../utils/dateFormatter'

function SocialMediaIcon( {link, image}: any) {
  return (
    <Link
      to={link}
      target="_blank"
    >
      <img
        style={{ borderRadius: '10px', margin: '20px' }}
        height="30"
        width="30"
        src={image}
        alt="social media image"
      />
    </Link>
  )
}

interface OutletContextType {
  setSharedTitle: (title: string) => void;
}

export function PortfolioHome() {

  const { setSharedTitle } = useOutletContext<OutletContextType>();



  useEffect(() => {
    setSharedTitle('');

  }, [])



  return (

    <Grid container direction='row' spacing={{ xl: 2, md: 5 }}>
      
      <Grid item md={1} xl={1}>

        <Box sx={{width:'10px', height: '100%', backgroundColor:'rbg(225,225,225,0,5)'}}>

        </Box>

      </Grid>
      <Grid item md={11} xl={11}>
        <Stack spacing={4} padding={'6vw 10vw 10vw 20vw'}>
        {/* <div style={{ position: 'relative', margin: '50px' }}> */}
      <CyberpunkTypography text={'Hi, I\'m Luis Florencio'} />
    {/* </div> */}


          <Card sx={{ width: '450px', borderRadius: '25px', backgroundColor: 'rgb(255, 255, 255,0.2)', overflow: 'hidden' }}>

            <CardActionArea sx={{ width: '450px', 
              borderRadius: '25px', 
              // border: '1px solid ', 
              overflow: 'hidden' }}>
              {/* <CardMedia
                component="img"
                height="130"
                image={frontPage}
                alt="front image"
                
              /> */}
              <Stack direction={'row'} alignItems={'bottom'} alignContent={'end'}>
                {/* <Box sx={{ marginTop: "-100px",
                marginLeft:'15px', 
                marginBottom:'15px', 
                borderRadius: '195px', 
                backgroundColor: 'rgb(255, 255, 255,0.3)', 
                padding: '4px', 
                width: '190px',
                height: '190px' }}>

                  <img
                    style={{ borderRadius: '195px',
                      
                     }}
                    height="190px"
                    width="190px"
                    src={profileImg}
                    alt="front image"
                  />



                </Box> */}

                <SocialMediaIcon link= "https://www.linkedin.com/in/aikoz" image={linkedIn}/>
                <SocialMediaIcon link= "https://github.com/Aikoz" image={github}/>
                <SocialMediaIcon link= "https://apps.apple.com/no/developer/ciudad-maderas/id1511022961" image={apple}/>
                <SocialMediaIcon link= "https://www.instagram.com/aikoz/" image={instagram}/>
                <SocialMediaIcon link= "https://www.facebook.com/jlfo.aikoz/" image={facebook}/>
                <SocialMediaIcon link= "https://independent.academia.edu/JLFO" image={academia}/>
                {/* https://www.academia.edu/35108805/Sistema_de_detecci%C3%B3n_de_no_estacionalidad_en_datos_temporales */}
                
                
                

                

              </Stack>
            </CardActionArea>

          </Card>

          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: '100%',
              color: 'lightgray'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Senior Systems Analyst with a focus on mobile applications, Swift application developer expert
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: '100%',
              color: 'lightgray'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            My main focus is to building clean, simple and user friendly interfaces,
            to bring aplications to the users that they could use as tools in their everyday lives.
            I prefer to provide users with all the information on how to use an app through intuitive design rather than written instructions.
            I know it’s not always possible, but whenever it is, I make sure to take advantage of it.
          </Typography>

        
              <Link
                to="/landingPage/resume/"
                style={{ textDecoration: 'none', color: 'lightgray' }}
              >
                <GlitchTypography text={'See more about me →'}/>
              </Link>
            
          

          {/* <Box sx={{ flexGrow: 1, marginLeft: '0vw', width: '97.4vw', transition: 'width 0.2s ease, margin 0.2s ease' }}>
            <Typography
              sx={{
                fontFamily: 'Libre Franklin, Arial, sans-serif',
                fontWeight: '200',
                fontSize: '20px',
                width: '100%',
                color: 'lightgray',
              }}
            >
              <Link
                to="/landingPage/resume/"
                style={{ textDecoration: 'none', color: 'lightgray' }}
              >
                <Box component="span" sx={{ textDecoration: 'underline', fontWeight: '200', fontSize: '25px', color: 'lightgray' }}>
                  My experience
                </Box>
              </Link>
              →
            </Typography>
          </Box> */}





        </Stack>
      </Grid>
    </Grid>

  )

}