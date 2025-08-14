import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
import apple from "../../../assets/appleDeveloper.png"
import CyberpunkTypography from "../../../utils/cyberpunkTypography";
import styled from "styled-components";
import PreviewCard from "../../../utils/previewCard";

const styles = `


@font-face {

font-family: 'Libre Franklin', Arial, sans-serif;

}

:root {
  --proximity: 400;
  --spread: 145;
  --blur: 16;
  --gap: 32;
  --vertical: true;
  --opacity: 0;

  --bg: hsl(246 44% 7%);
  --border: hsl(280 10% 50% / 1);
  --card: hsl(237 36% 10%);
  --color: hsl(240 18% 80%);
  --border-width: 2px;
  --border-radius: 12px;
  --gradient: conic-gradient(from 180deg at 50% 70%,hsla(0,0%,98%,1) 0deg,#eec32d 72.0000010728836deg,#ec4b4b 144.0000021457672deg,#709ab9 216.00000858306885deg,#4dffbf 288.0000042915344deg,hsla(0,0%,98%,1) 1turn);
}

*,
*:after,
*:before {
  box-sizing: border-box;
}

@property --start {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

body {
  background: var(--bg);
  display: grid;
  place-items: center;
  min-height: 100vh;
  font-weight: 70;
  color: var(--color);
}

.container {
  --spread: 145;
  font-family: 'Libre Franklin', Arial, sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: var(--direction);
  gap: calc(var(--gap) * 1px);
  justify-content: center;
  place-items: center;
  position: relative;
  touch-action: none;
  color: white;
  width: 100%;
}

article {
  --active: 0.15;
  --start: 0;
  height: 30vh;
  width: 100%;
  background: var(--card);
  padding: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
  background-color: rgb(6,6,6,0.4);

}

/* Para pantallas pequeñas (móviles) */
@media (max-width: 600px) {
  article {
    height: 40vh; /* Ajustar altura para móviles */
  }
}

/* Para pantallas medianas (tabletas) */
@media (min-width: 601px) and (max-width: 1024px) {
  article {
    height: 40vh; /* Ajustar altura para tabletas */
  }
}

/* Para pantallas grandes (PC) */
@media (min-width: 1025px) {
  article {
    height: 30vh; /* Ajustar altura para PC */
  }
}
article:is(:hover, :focus-visible) {
  z-index: 2;
}

.glows {
  pointer-events: none;
  position: absolute;
  inset: 0;
  filter: blur(calc(var(--blur) * 1px));
}

.glows::after,
.glows::before {
  --alpha: 0;
  content: "";
  background: var(--gradient);
  background-attachment: fixed;
  position: absolute;
  inset: -5px;
  border: 10px solid transparent;
  border-radius: var(--border-radius);
  mask: linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - (var(--spread) * 0.5)) * 1deg), #000 0deg, #fff, #0000 calc(var(--spread) * 1deg));
  mask-composite: intersect;
  mask-clip: padding-box, border-box;
  opacity: var(--active);
  transition: opacity 1s;
}

article::before {
  position: absolute;
  inset: 0;
  border: var(--border-width) solid transparent;
  content: "";
  border-radius: var(--border-radius);
  pointer-events: none;
  background: var(--border);
  background-attachment: fixed;
  mask: linear-gradient(#0000, #0000), conic-gradient(from calc(((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 1.5)) * 1deg), hsl(0 0% 100% / 0.15) 0deg, white, hsl(0 0% 100% / 0.15) calc(var(--spread) * 2.5deg));
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  opacity: var(--active);
  transition: opacity 1s;
}

article::after {
  --bg-size: 100%;
  content: "";
  pointer-events: none;
  position: absolute;
  background: var(--gradient);
  background-attachment: fixed;
  border-radius: var(--border-radius);
  opacity: var(--active, 0);
  transition: opacity 1s;
  --alpha: 0;
  inset: 0;
  border: var(--border-width) solid transparent;
  mask: linear-gradient(#0000, #0000), conic-gradient(from calc(((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 0.5)) * 1deg), #0000 0deg, #fff, #0000 calc(var(--spread) * 0.5deg));
  filter: brightness(1.5);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
}

.badge {
  border: 1px solid var(--border);
  align-self: start;
  border-radius: 10px;
  padding: 0.5rem 0.7rem;
  font-size: 0.675rem;
  align-items: center;
  gap: 0.25rem;
  font-weight: 50;
}

a {
  color: var(--color);
  text-decoration: none;
  opacity: 1;
  display: inline-block;
  align-self: start;
  transition: opacity 0.2s;
}

a:is(:hover, :focus-visible) {
  opacity: 1;
}

article h2 {
  margin: 0;
  padding: 1rem 0;
  font-weight: 100;
  font-size: 1.5rem;
}

.header {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.header svg {
  --count: 4;
  width: 106px;
}

.header svg:nth-of-type(2),
.header svg:nth-of-type(3),
.header svg:nth-of-type(4) {
  position: absolute;
  z-index: calc(var(--count) - var(--index));
  translate: calc(var(--index) * 30%) 0;
  opacity: calc(var(--count) / (2 * (var(--index) * 10)));
}

.header svg:nth-of-type(2) {
  --index: 1;
}
.header svg:nth-of-type(3) {
  --index: 2;
}
.header svg:nth-of-type(4) {
  --index: 3;
}

.badge svg {
  width: 16px;
}

.dg.ac {
  z-index: 99999 !important;
}
  .dg {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
`;

const itemList = [

  {
    title: 'Mantenimiento GPH',
    description: 'Mobile app that allows Ciudad Maderas condominium residents to request access from security guards to enter their homes easily and quickly. This applies to both the residents and their visitors, cleaning staff, etc.',
    link: 'https://apps.apple.com/es/app/mantenimiento-gph/id1589080781',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/GrsGURQ-Sq0?autoplay=1&mute=1&loop=1&controls=0&playlist=GrsGURQ-Sq0',
    technologies: [
      { name: 'Swift', color: 'orange' },
      { name: 'SQL', color: 'gray' },
      { name: 'Node JS', color: 'darkyellow' },
      { name: 'Firebase', color: 'red' },

    ]
  },
  {
    title: 'Club Maderas',
    description: 'Mobile application to redeem benefits offered by Ciudad maderas to their customers.',
    link: 'https://appadvice.com/app/club-maderas/1439158658',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/EcT7QAmbNMU?autoplay=1&mute=1&loop=1&controls=0&playlist=EcT7QAmbNMU',
    technologies: [
      { name: 'Swift', color: 'orange' },
      { name: 'Core Data', color: 'darkgray' },
      { name: 'MySQL', color: 'gray' },
      { name: 'Node JS', color: 'yellow' },
    ]
  },
  {
    title: 'Pagos CM',
    description: 'Mobile app that allows Ciudad Maderas clients to pay their monthly fees, check information about the properties they have acquired, download their payment receipts, and verify that they have no outstanding balances.',
    link: 'https://apps.apple.com/mx/app/pagos-cm/id1558729335',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/iaUkkp2ja7I?autoplay=1&mute=1&loop=1&controls=0&playlist=iaUkkp2ja7I',
    technologies: [
      { name: 'React JS', color: 'green' },
      { name: 'SQL', color: 'gray' },
      { name: 'Node JS', color: 'yellow' },
      { name: 'Firebase', color: 'orange' },
    ]
  },
  {
    title: 'Socio Maderas',
    description: 'Web and mobile applications that allow users to invest amounts starting from 5000 MXN to generate high returns depending on the amount invested. They also enable users to check their earnings, withdraw returns, make new investments, and redeem exclusive benefits for the platform\'s investors.',
    link: 'https://www.facebook.com/sociomaderas?paipv=0&eav=AfZz-zh-P3sINAiQnt3FW62R9OVj3uEbL16emYJoBjp4RGr-kcV4HCcEB-oCF-uaTwI',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/7KlEOSllvaI?autoplay=1&mute=1&loop=1&controls=0&playlist=7KlEOSllvaI',
    technologies: [
      { name: 'Swift', color: 'orange' },
      { name: 'React JS', color: 'green' },
      { name: 'SQL', color: 'gray' },
      { name: 'Node JS', color: 'yellow' },
      { name: 'Salesforce', color: 'cyan' },
      { name: 'Metamap', color: 'blue' },
      { name: 'Cincel', color: 'purple' },

    ]
  },
  {
    title: 'Suma',
    description: 'Mobile application that allow users to buy virtual land backed by Ciudad Maderas to generate high returns depending on the amount invested. They also enable users to check their earnings, withdraw returns, and acquire more virtual land.',
    link: 'https://ciudadmaderas.com/blog/suma-de-ciudad-maderas-la-nueva-inversion/',
    mediaType: 'image',
    mediaSrc: 'https://ciudadmaderas.com/wp-content/uploads/2023/02/2302-BLOG-03-SUMA-01.webp',
    technologies: [
      { name: 'React JS', color: 'green' },
      { name: 'SQL', color: 'gray' },
      { name: 'Node JS', color: 'yellow' },
    ]
  },
  {
    title: 'Amazon Skill: Pagos CM',
    description: 'Skill for Alexa devices that allows users to make the inquiries that can be done through the Pagos CM app, but from devices with the Alexa platform integrated, such as Fire TV, Echo, Echo Show, etc.',
    link: 'https://www.amazon.com.mx/Ciudad-Maderas-Consulta-referencia/dp/B0CLKV5Y7Q/ref=sr_1_1?__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=D1ZJLG1CW0UJ&dib=eyJ2IjoiMSJ9.yligEx9Qq-oEBjUN_to6Sw.nDZmxBzP_q5Fnzm7jmb0gMo5iGhOx8Y37ouAttAsKwc&dib_tag=se&keywords=ciudad+maderas&qid=1721034778&s=digital-skills&sprefix=ciudad+maderas%2Calexa-skills%2C125&sr=1-1',
    mediaType: 'youtube',
    mediaSrc: 'https://www.youtube.com/embed/Hpjp3fHUQK0?autoplay=1&mute=1&loop=1&controls=0&playlist=Hpjp3fHUQK0',
    technologies: [
      { name: 'Lambda AWS', color: 'lightgray' },
      { name: 'SQL', color: 'gray' },
      { name: 'Node JS', color: 'yellow' },
    ]
  }
  // Add more items as needed
];

const Article = ({ description, children, badgeList, title }: any) => (
  <article>
    <div className="glows"></div>

    <Grid container direction={'row'} sx={{ height: '100%', overflow: 'hidden' }}>
      <Grid item md={12} sx={{ minHeight: '10%', padding: '2px' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {badgeList.map((item: any) => (
            <span className="badge" style={{ borderColor: `${item.color}`, marginRight: '10px' }}>
              <span>{item.name}</span>
            </span>
          ))}

        </Box>

      </Grid>
      <Grid item md={6} xl={6} sx={{ padding: '10px', overflow: 'hidden' }}>
        <Typography

          sx={{
            fontFamily: 'Libre Franklin, Arial, sans-serif',
            fontWeight: '400',
            fontSize: '25px',
            width: '100%',
            marginBottom: '-25px'

            // backgroundColor:'green',
            // textAlign: 'center'
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginTop: '5%' }}
        >{description}</Typography>
      </Grid>
      <Grid item md={6} xl={6} sx={{ height: '89%', padding: '20px', overflow: 'hidden' }}>
        {children}
      </Grid>


    </Grid>



    {/* <a href="">{linkText}</a> */}
  </article>
);

function SocialMediaIcon({ link, image }: any) {
  return (
    <Link
      to={link}
      target="_blank"
      style={{ textDecoration: 'none' }}

    >
      <Stack direction={'row'}>
        <img
          style={{ borderRadius: '10px', margin: '5px 20px 20px 0px' }}
          height="50"
          width="50"
          src={image}
          alt="social media image"
        />
                      <CyberpunkTypography> Selected projects </CyberpunkTypography>


      </Stack>

    </Link>
  )
}

interface OutletContextType {
  setSharedTitle: (title: string) => void;
  setLoading: (title: boolean) => void;
}

export function PortfolioProjects() {

  const { setSharedTitle, setLoading } = useOutletContext<OutletContextType>();



  useEffect(() => {
    setSharedTitle('Projects');
    setLoading(false);

  }, [])
  useEffect(() => {
    const CONTAINER = document.querySelector('.container');
    const CARDS = document.querySelectorAll('article');

    const CONFIG = {
      proximity: 40,
      spread: 10,
      blur: 20,
      gap: 32,
      vertical: true,
      opacity: 0,
    };

    const UPDATE = (event: any) => {
      if (!CONTAINER) return;
      for (const card of CARDS) {
        const CARD = card as HTMLElement;
        const CARD_BOUNDS = CARD.getBoundingClientRect();
        if (
          event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          CARD.style.setProperty('--active', '1');
        } else {
          CARD.style.setProperty('--active', CONFIG.opacity.toString());
        }
        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];
        let ANGLE = Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) * 180 / Math.PI;
        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
        CARD.style.setProperty('--start', (ANGLE + 90).toString());
      }
    };

    document.body.addEventListener('pointermove', UPDATE);

    // const RESTYLE = () => {
    //   if (!CONTAINER) return;

    // };

    //   const CTRL = new GUI({ width: 340 });
    //   CTRL.add(CONFIG, 'spread', 10, 180, 1).name('Spread (deg)').onChange(RESTYLE);
    // CTRL.add(CONFIG, 'proximity', 10, 180, 1).name('Active Proximity (px)').onChange(RESTYLE);
    // CTRL.add(CONFIG, 'gap', 10, 100, 1).name('Gap (px)').onChange(RESTYLE);
    // CTRL.add(CONFIG, 'blur', 0, 50, 1).name('Blur (px)').onChange(RESTYLE);
    // CTRL.add(CONFIG, 'opacity', 0, 1, 0.01).name('Inactive Opacity').onChange(RESTYLE);
    // CTRL.add(CONFIG, 'vertical').name('Vertical Layout').onChange(RESTYLE);

    // RESTYLE();
    UPDATE(event);
  }, []);
  return (
    <>

      <Grid container direction='row' p={'5%'} spacing={{ xl: 2, md: 2 }}>
        <Grid item md={12} xl={12}>
          <Stack spacing={5} >
            <SocialMediaIcon link="https://apps.apple.com/no/developer/ciudad-maderas/id1511022961" image={apple} />
            <style>{styles}</style>
            <div className="container">
              <Container>
                <Grid container spacing={2}>
                  {itemList.map((item, index) => (
                    <Grid item xs={12} sm={12} md={12} xl={6} key={index}>

                      <Article
                        badgeList={
                          item.technologies
                        }
                        badgeContent="Pointer tracking glows"
                        description={item.description}
                        title={item.title}

                        linkText="Learn more"
                      >
                        <PreviewCard
                          title={item.title}
                          mediaType={item.mediaType}
                          mediaSrc={item.mediaSrc}
                        />
                      </Article>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>

            <Link
              to="/landingPage/resume/"
              style={{ textDecoration: 'none', color: 'lightgray' }}
            >
              <GlitchTypography text={'My resumé →'} />
            </Link>

          </Stack>
        </Grid>
      </Grid>
    </>


  )

}