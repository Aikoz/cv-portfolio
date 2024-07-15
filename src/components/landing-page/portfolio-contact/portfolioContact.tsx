import { useEffect, useRef } from "react";
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
import styled from "styled-components";
import Sidebar from "../../../utils/sideBar";
// import { Delete, EditNote } from "@mui/icons-material";
// import { server } from "../../../utils/constants";
// import { DateFormatter } from '../../../utils/dateFormatter'

const Container = styled.div`
  display: flex;
  margin-left: 220px;
  padding: 20px;
`;

const Article = styled.div`
  margin-bottom: 50px;
`;

function SocialMediaIcon({ link, image }: any) {
  return (
    <Link
      to={link}
      target="_blank"
    >
      <Stack direction={'row'}>
        <img
          style={{ borderRadius: '10px', margin: '-15px 20px 20px 0px' }}
          height="50"
          width="50"
          src={image}
          alt="social media image"
        />
        <CyberpunkTypography text={'Contact.'} />

      </Stack>

    </Link>
  )
}

interface OutletContextType {
  setSharedTitle: (title: string) => void;
}

export function PortfolioContact() {

  const { setSharedTitle } = useOutletContext<OutletContextType>();



  useEffect(() => {
    setSharedTitle('Contact');

  }, [])


  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (

    <Grid container direction='row' spacing={{ xl: 2, md: 2 }}>
      <Grid item md={2} xl={2} >

      </Grid>
      <Grid item md={10} xl={10}>
      <CyberpunkTypography text={'_.    -'} />
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
              marginBottom:'45px'
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

  )

}