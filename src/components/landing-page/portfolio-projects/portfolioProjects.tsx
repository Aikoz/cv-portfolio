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
        <CyberpunkTypography text={'Selected projects'} />

      </Stack>

    </Link>
  )
}

interface OutletContextType {
  setSharedTitle: (title: string) => void;
}

export function PortfolioProjects() {

  const { setSharedTitle } = useOutletContext<OutletContextType>();



  useEffect(() => {
    setSharedTitle('Projects');

  }, [])
  const articles = [
    {
      title: 'Socio Maderas',
      link: 'https://portal.sociomaderas.com/',
      content: ''
    },
    {
      title: 'Pagos CM',
      link: 'https://apps.apple.com/mx/app/pagos-cm/id1558729335',
      content: ''
    },
    {
      title: 'Mantenimiento GPH',
      link: 'https://apps.apple.com/es/app/mantenimiento-gph/id1589080781',
      content: ''
    },
    {
      title: 'Club Maderas',
      link: 'https://appadvice.com/app/club-maderas/1439158658',
      content: ''
    },
    {
      title: 'Amazon Skill: Pagos CM',
      link: 'https://www.amazon.com.mx/Ciudad-Maderas-Consulta-referencia/dp/B0CLKV5Y7Q/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=D1ZJLG1CW0UJ&dib=eyJ2IjoiMSJ9.yligEx9Qq-oEBjUN_to6Sw.nDZmxBzP_q5Fnzm7jmb0gMo5iGhOx8Y37ouAttAsKwc&dib_tag=se&keywords=ciudad+maderas&qid=1721034778&s=digital-skills&sprefix=ciudad+maderas%2Calexa-skills%2C125&sr=1-1',
      content: ''
    },
    {
      title: 'Suma',
      link: 'https://ciudadmaderas.com/blog/suma-de-ciudad-maderas-la-nueva-inversion/',
      content: ''
    },
  ];

  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToArticle = (index: number) => {
    if (articleRefs.current[index]) {
      articleRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (

    <Grid container direction='row' spacing={{ xl: 2, md: 2 }}>
      <Grid item md={2} xl={2} >

      </Grid>
      <Grid item md={10} xl={10}>
        <Stack spacing={1} padding={'6vw 10vw 10vw 0vw'}>
          <SocialMediaIcon link="https://apps.apple.com/no/developer/ciudad-maderas/id1511022961" image={apple} />

          <Container>

            <div>
              {articles.map((article, index) => (
                <Link to={article.link}
                  target="_blank">
                  <Article key={index} ref={(el) => (articleRefs.current[index] = el)}>
                    <CyberpunkTypography text={'_.    -'} />
                    <Typography
                      sx={{
                        fontFamily: 'Libre Franklin, Arial, sans-serif',
                        fontWeight: '400',
                        fontSize: '30px',
                        width: '100%',
                        mt: 2,
                        color: 'lightgray',
                      }} >{article.title}</Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Libre Franklin, Arial, sans-serif',
                        fontWeight: '200',
                        fontSize: '15px',
                        width: '100%',
                        color: 'lightgray',
                      }} >{article.content}</Typography>

                  </Article>
                </Link>
              ))}
            </div>
          </Container>




          <Link
            to="/landingPage/resume/"
            style={{ textDecoration: 'none', color: 'lightgray' }}
          >
            <GlitchTypography text={'My resumé →'} />
          </Link>

        </Stack>
      </Grid>
    </Grid>

  )

}