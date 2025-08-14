import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
import academia from "../../../assets/academia.png"
import CyberpunkTypography from "../../../utils/cyberpunkTypography";
import styled from "styled-components";

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
        <CyberpunkTypography> Academia </CyberpunkTypography>

      </Stack>

    </Link>
  )
}

interface OutletContextType {
  setSharedTitle: (title: string) => void;
  setLoading: (title: boolean) => void;
}

export function PortfolioReadings() {

  const { setSharedTitle, setLoading } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setSharedTitle('Published research papers');
    setLoading(false);

  }, [])
  const articles = [
    {
      title: 'Sistema de detección de no estacionalidad en datos temporales',
      link: 'https://www.academia.edu/35108805/Sistema_de_detecci%C3%B3n_de_no_estacionalidad_en_datos_temporales',
      content: 'Los datos temporales o series de tiempo son aquellos que son registrados en forma periódica derivados del estudio de algún fenómeno de interés, en diferentes dominios como pueden ser el médico, financiero, industrial, por mencionar algunos. El análisis de este tipo de datos es importante debido a que con base en dicho análisis se pueden tomar decisiones para prevenir o disminuir los efectos de la ocurrencia del fenómeno estudiado. Existen diferentes métodos de análisis de este tipo de datos pero...'
    },
    {
      title: 'Minería de datos para mejorar la construcción de sistemas tecnológicos',
      link: 'https://www.academia.edu/35054748/Miner%C3%ADa_de_datos_para_mejorar_la_construcci%C3%B3n_de_sistemas_tecnol%C3%B3gicos',
      content: 'La minería de datos es el proceso de descubrir conocimiento interesante a partir del análisis de grandes cantidades de información generalmente almacenadas en bases de datos. Existen desarrollos de sistemas tecnológicos enfocados al estudio de algún fenómeno de interés, los cuales se encargan de capturar información en abundancia pero muchas veces se desconoce si dicha información es de importancia para el estudio de dicho fenómeno, la información capturada por dichos sistemas generalmente...'
    },
  ];

  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (

    <Grid container direction='row' spacing={{ xl: 2, md: 2 }}>
      <Grid item md={2} xl={2} >

      </Grid>
      <Grid item md={10} xl={10}>
        <Stack spacing={1} padding={'6vw 10vw 10vw 0vw'}>
          <SocialMediaIcon link="https://independent.academia.edu/JLFO" image={academia} />

          <Container>

            <div>
              {articles.map((article, index) => (
                <Link key={index} to={article.link}
                  target="_blank">
                  <Article key={index} ref={(el) => (articleRefs.current[index] = el)}>
                    <CyberpunkTypography> _.    -</CyberpunkTypography>

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
            to="/landingPage/portfolioProjects/"
            style={{ textDecoration: 'none', color: 'lightgray' }}
          >
            <GlitchTypography text={'Go to my projects →'} />
          </Link>

        </Stack>
      </Grid>
    </Grid>

  )

}