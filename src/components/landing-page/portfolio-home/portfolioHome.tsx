import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Card, CardActionArea, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
import profileImg from "../../../assets/profileImg.jpg"
// import facebook from "../../../assets/facebook.png"
import apple from "../../../assets/appleDeveloper.png"
// import instagram from "../../../assets/Instagram.png"
// import github from "../../../assets/github.png"
import linkedIn from "../../../assets/LinkedIn.png"
import academia from "../../../assets/academia.png"
import CyberpunkTypography from "../../../utils/cyberpunkTypography";
// import { Delete, EditNote } from "@mui/icons-material";
// import { server } from "../../../utils/constants";
// import { DateFormatter } from '../../../utils/dateFormatter'

function SocialMediaIcon({ link, image }: any) {
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
        loading="lazy"
        alt=""
      />
    </Link>
  )
}

interface OutletContextType {
  setSharedTitle: (title: string) => void;
  setLoading: (title: boolean) => void;
}

export function PortfolioHome() {

  const { setSharedTitle, setLoading } = useOutletContext<OutletContextType>();

  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    setSharedTitle('Welcome');
    const images = document.querySelectorAll('img');
    const totalImages = images.length;
    let loadedImages = 0;
    console.dir(allImagesLoaded)
    const checkAllImagesLoaded = () => {
      loadedImages += 1;
      if (loadedImages === totalImages) {
        setAllImagesLoaded(true);
        console.log('All images loaded');
        setLoading(false);

        // Puedes realizar otras acciones aquí cuando todas las imágenes se hayan cargado
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllImagesLoaded();
      } else {
        img.addEventListener('load', checkAllImagesLoaded);
        img.addEventListener('error', checkAllImagesLoaded);
      }
    });

    // Cleanup event listeners
    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', checkAllImagesLoaded);
        img.removeEventListener('error', checkAllImagesLoaded);
      });
    };
  }, []);

  return (
    <Box sx={{
      width: '90%',
      margin: '5%',
      height: '100%',
      backgroundColor: 'rbg(225,225,225,0.5)',
      //overflow: 'hidden'
    }} >
      <Grid container direction='row' spacing={{ xl: 2, md: 5 }} sx={{ width: '100%' }} >


        <Grid item md={12} xl={12}>
          <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rbg(225,225,225,0.5)',
            //overflow: 'hidden'
          }}>

            <Stack spacing={'1%'}>
              {/* <div style={{ position: 'relative', margin: '50px' }}> */}
              <CyberpunkTypography text={'Hi, I\'m Luis Florencio'} />
              {/* </div> */}


              <Card sx={{
                maxWidth: '680px',
                borderRadius: '25px',
                backgroundColor: 'rgb(255, 255, 255,0.1)',
                //overflow: 'hidden'
              }}>

                <CardActionArea sx={{
                  maxWidth: '680px',
                  borderRadius: '25px',
                  // border: '1px solid ', 
                  //overflow: 'hidden'
                }}>

                  <CardMedia
                    component="video"
                    height="105"
                    //controls
                    autoPlay
                    muted
                    loop
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      backgroundColor: 'black',
                      pointerEvents: 'none',
                      opacity: 0.5,
                    }}
                  >
                    <source src='https://cdn.pixabay.com/video/2021/10/19/92561-636709928_large.mp4' type="video/mp4" />
                    Your browser does not support the video tag.
                  </CardMedia>
                  <Box sx={{
                    height: '105px',
                    width: '100%',
                    position: 'absolute', // Ensure it's positioned correctly over the CardMedia
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(17, 25, 40, 0.6)',
                    animation: `filterAnimation 4s infinite alternate`,
                    '@keyframes filterAnimation': {
                      '0%': {
                        backdropFilter: 'blur(0px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(0px) saturate(100%)',
                        backgroundColor: 'rgba(95, 95, 95, 0.1)',

                      },
                      '31%': {
                        backdropFilter: 'blur(0px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(0px) saturate(180%)',
                        backgroundColor: 'rgba(105, 105, 105, 0.1)',

                      },
                      '97%': {
                        backdropFilter: 'blur(0px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(0px) saturate(180%)',
                        backgroundColor: 'rgba(105, 105, 105, 0.1)',

                      },
                      '98%': {
                        backdropFilter: 'blur(16px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        backgroundColor: 'rgba(17, 25, 40, 0.65)',

                      },
                      '100%': {
                        backdropFilter: 'blur(0px) saturate(100%)',
                        WebkitBackdropFilter: 'blur(0px) saturate(180%)',
                        backgroundColor: 'rgba(155, 155, 155, 0.1)',

                      },
                    },
                  }} />


                  <Stack direction={'row'} alignItems={'bottom'} alignContent={'end'} sx={{
                    '@media (max-width: 450px)': {
                      flexDirection: 'column',
                    },
                  }}>
                    <Box sx={{
                      marginTop: "-100px",
                      marginLeft: '15px',
                      marginBottom: '15px',
                      borderRadius: '195px',
                      backgroundColor: 'rgb(255, 255, 255,0.3)',
                      padding: '4px',
                      width: '150px',
                      height: '150px',
                      position: 'absolute',
                    }}>

                      <img
                        style={{
                          borderRadius: '195px',

                        }}
                        height="150px"
                        width="150px"
                        loading="lazy"
                        src={profileImg}
                        alt=""
                      />



                    </Box>
                    <Box marginLeft='180px' height={'70px'}></Box>

                    <Stack
                      direction={'row'}
                      flexWrap={'wrap'}
                      sx={{
                        '@media (max-width: 50px)': {
                          //flexDirection: 'column',
                          //visibility:'collapse'
                        },
                      }} >
                      <SocialMediaIcon link="https://www.linkedin.com/in/aikoz" image={linkedIn} />
                      <SocialMediaIcon link="https://independent.academia.edu/JLFO" image={academia} />
                      <SocialMediaIcon link="https://apps.apple.com/no/developer/ciudad-maderas/id1511022961" image={apple} />
                      {/* <SocialMediaIcon link="https://github.com/Aikoz" image={github} /> */}
                      {/* <SocialMediaIcon link="https://www.instagram.com/aikoz/" image={instagram} /> */}
                      {/* <SocialMediaIcon link="https://www.facebook.com/jlfo.aikoz/" image={facebook} /> */}
                      {/* <SocialMediaIcon link="https://www.facebook.com/jlfo.aikoz/" image={facebook} /> */}
                      {/* https://www.academia.edu/35108805/Sistema_de_detecci%C3%B3n_de_no_estacionalidad_en_datos_temporales */}

                    </Stack>








                  </Stack>
                </CardActionArea>

              </Card>

              <Typography
                variant="subtitle1"
              >
                Senior Systems Analyst with a focus on mobile applications, Swift application developer expert
              </Typography>

              <Typography
                variant="subtitle1"

              >
                My main focus is to building clean, simple and user friendly interfaces,
                to bring aplications to the users that they could use as tools in their everyday lives.
                I prefer to provide users with all the information on how to use an app through intuitive design rather than written instructions.
                I know it’s not always possible, but whenever it is, I make sure to take advantage of it.
              </Typography>


              <Link
                to="/landingPage/portfolioReadings/"
                style={{ textDecoration: 'none', color: 'lightgray' }}
              >
                <GlitchTypography text={'Check out more about my published research papers →'} />
              </Link>

              <Typography
                sx={{
                  fontFamily: 'Libre Franklin, Arial, sans-serif',
                  fontWeight: '200',
                  fontSize: '12px',
                  width: '100%',
                  color: 'lightgray',
                }} >{"\"Portfolio under development. Expect great things to come.\""}</Typography>




            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>


  )

}