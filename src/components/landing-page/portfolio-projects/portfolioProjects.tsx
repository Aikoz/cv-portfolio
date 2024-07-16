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
import PreviewCard from "../../../utils/previewCard";
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

const itemList = [
  {
    title: 'Socio Maderas',
    description: '',
    link: 'https://www.facebook.com/sociomaderas?paipv=0&eav=AfZz-zh-P3sINAiQnt3FW62R9OVj3uEbL16emYJoBjp4RGr-kcV4HCcEB-oCF-uaTwI',
    mediaType: 'video',
    mediaSrc: 'https://scontent.fmex10-4.fna.fbcdn.net/v/t42.1790-2/268440996_2167900870027196_1892635545118626706_n.mp4?_nc_cat=106&ccb=1-7&_nc_sid=55d0d3&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCIsInZpZGVvX2lkIjoxNjQ4NTc3MTAyMTQwNTg1fQ%3D%3D&_nc_ohc=XipmRjvavfsQ7kNvgH3kTRi&tn=CWKljQBgTi1tLTY2&_nc_rml=0&_nc_ht=scontent.fmex10-4.fna&oh=00_AYAOI7CTAO7MWc4Wve6j1MPPm307BgGeQhMN7b3ztO8USQ&oe=669BE30D',
  },
  {
    title: 'Pagos CM',
    description: '',
    link: 'https://apps.apple.com/mx/app/pagos-cm/id1558729335',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/iaUkkp2ja7I?autoplay=1&mute=1&loop=1&controls=0&playlist=iaUkkp2ja7I',
  },
  {
    title: 'Mantenimiento GPH',
    description: '',
    link: 'https://apps.apple.com/es/app/mantenimiento-gph/id1589080781',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/GrsGURQ-Sq0?autoplay=1&mute=1&loop=1&controls=0&playlist=GrsGURQ-Sq0',
  },
  {
    title: 'Club Maderas',
    description: '',
    link: 'https://appadvice.com/app/club-maderas/1439158658',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/EcT7QAmbNMU?autoplay=1&mute=1&loop=1&controls=0&playlist=EcT7QAmbNMU',
  },
  {
    title: 'Amazon Skill: Pagos CM',
    description: '',
    link: 'https://www.amazon.com.mx/Ciudad-Maderas-Consulta-referencia/dp/B0CLKV5Y7Q/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=D1ZJLG1CW0UJ&dib=eyJ2IjoiMSJ9.yligEx9Qq-oEBjUN_to6Sw.nDZmxBzP_q5Fnzm7jmb0gMo5iGhOx8Y37ouAttAsKwc&dib_tag=se&keywords=ciudad+maderas&qid=1721034778&s=digital-skills&sprefix=ciudad+maderas%2Calexa-skills%2C125&sr=1-1',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/Hpjp3fHUQK0?autoplay=1&mute=1&loop=1&controls=0&playlist=Hpjp3fHUQK0',
  },
  {
    title: 'Suma',
    description: '',
    link: 'https://ciudadmaderas.com/blog/suma-de-ciudad-maderas-la-nueva-inversion/',
    mediaType: 'image',
    mediaSrc: 'https://ciudadmaderas.com/wp-content/uploads/2023/02/2302-BLOG-03-SUMA-01.webp',
  },
  // Add more items as needed
];

function SocialMediaIcon({ link, image }: any) {
  return (
    <Link
      to={link}
      target="_blank"
      style={{ textDecoration: 'none' }}

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
            <Grid container spacing={2}>
              {itemList.map((item, index) => (
                <Grid item xs={6} sm={6} md={6} key={index}>
                  <PreviewCard
                    title={item.title}
                    description={item.description}
                    mediaType={item.mediaType}
                    mediaSrc={item.mediaSrc}
                    dlink={item.link}
                  />
                </Grid>
              ))}
            </Grid>
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