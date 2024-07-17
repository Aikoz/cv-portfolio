import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
import CyberpunkSecondaryTypography from "../../../utils/cyberpunkSecondaryTypography";
import CyberpunkTypography from "../../../utils/cyberpunkTypography";

const ExperienceItem = ({ title, company, dateRange, tasks }: any) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        direction: 'row',
        gap: '10px',
        width: '100%',
        alignItems: 'center',
        justifyItems: 'center',
        marginBottom: '17px',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Libre Franklin, Arial, sans-serif',
          fontWeight: '200',
          fontSize: '17px',
          color: 'white',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Libre Franklin, Arial, sans-serif',
          fontWeight: '200',
          fontSize: '17px',
          color: 'white',
        }}
      >
        ·
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Libre Franklin, Arial, sans-serif',
          fontWeight: '800',
          fontSize: '17px',
          color: 'white',
        }}
      >
        {company}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Libre Franklin, Arial, sans-serif',
          fontWeight: '200',
          fontSize: '13px',
          color: 'lightgray',
        }}
      >
        {dateRange}
      </Typography>
    </Box>
    {tasks.map((task: string, index: number) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          direction: 'row',
          gap: '17px',
          width: '100%',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Libre Franklin, Arial, sans-serif',
            fontWeight: '800',
            fontSize: '16px',
            marginLeft: '30px',
            color: 'white',
          }}
        >
          ●
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Libre Franklin, Arial, sans-serif',
            fontWeight: '200',
            fontSize: '16px',
            color: 'white',
          }}
        >
          {task}
        </Typography>
      </Box>
    ))}
  </Box>
);

const LanguageItem = ({ language, proficiency }: any) => (
  <Typography
    variant="h6"
    sx={{
      fontFamily: 'Libre Franklin, Arial, sans-serif',
      fontWeight: '200',
      fontSize: '16px',
      color: 'white',
    }}
  >
    {language} → {proficiency}
  </Typography>
);
const ContactInfo = ({ email, phone, linkedin }: any) => (
  <Box mb={2}>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {email}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {phone}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {linkedin}
    </Typography>
  </Box>
);

const PersonalInfo = ({ age, nationality, license }: any) => (
  <Box mb={2}>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {age}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {nationality}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {license}
    </Typography>
  </Box>
);

const Address = ({ address }: any) => (
  <Box mb={2}>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {address}
    </Typography>
  </Box>
);

const SkillCategory = ({ category, skills }: any) => (
  <Box mb={2}>
    <Typography
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '800',
        fontSize: '15px',
        width: 'auto',
        color: 'white'
      }}
    >
      {category}
    </Typography>
    <Typography
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {skills}
    </Typography>
  </Box>
);

const EducationItem = ({ institution, details }: any) => (
  <Box mb={2}>
    <Typography
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '800',
        fontSize: '15px',
        width: 'auto',
        color: 'white'
      }}
    >
      {institution}
    </Typography>
    <Typography
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {details}
    </Typography>
  </Box>
);

const ProjectItem = ({ title, description }: any) => (
  <Box mb={2}>
    <Typography
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '800',
        fontSize: '15px',
        width: 'auto',
        color: 'white'
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontFamily: 'Libre Franklin, Arial, sans-serif',
        fontWeight: '200',
        fontSize: '17px',
        width: 'auto',
        color: 'white'
      }}
    >
      {description}
    </Typography>
  </Box>
);

const Section = ({ title, children }: any) => (
  <Box mb={2}>
    <CyberpunkSecondaryTypography text={title}></CyberpunkSecondaryTypography>


    {children}
  </Box>
);

interface OutletContextType {
  setSharedTitle: (title: string) => void;
  setLoading: (title: boolean) => void;
}

export function PortfolioCV() {

  const { setSharedTitle, setLoading } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setSharedTitle('Resumé');
    setLoading(false);

  }, [])



  return (
    <Stack>
      <Grid container direction='row' spacing={{ xl: 2, md: 5 }}>

        <Grid item md={12} xl={10}>
          <Stack>

            <CyberpunkTypography text='José Luis Florencio Ortíz'>

            </CyberpunkTypography>

            <Typography
              mt={6}
              sx={{
                fontFamily: 'Libre Franklin, Arial, sans-serif',
                fontWeight: '200',
                fontSize: '20px',
                width: '70%',
                color: 'lightgray',
              }}
            >
              Senior Systems Analyst with a focus on mobile applications, Swift application developer expert
            </Typography>

            <Section title="Relevant experience">
              <ExperienceItem
                title="Senior Systems Analyst"
                company="Ciudad Maderas"
                dateRange="September 2022 - July 2024"
                tasks={[
                  "Maintenance, developing and testing of new mobile applications integrating polished interfaces to ensure content experience, responsiveness, video quality, audio quality, and functional stability.",
                  "Unlisted app distribution on Apple Connect platform for a newly created mobile application that needs to be distributed among clients and employees of the company.",
                  "Developed and shipped web back-end and front-end web apps using Node and React technologies.",
                  "Alexa skill developed to provide Ciudad Maderas’s customers with an easy way to consult information about their land.",
                  "Collaborated with a Salesforce team to integrate a React project and a Swift application with one of their solutions, utilizing Cincel, Google Cloud Storage, and Metamap.",
                  "Developed a React app and a Swift app for an NFT investing platform."
                ]}
              />
              <ExperienceItem
                title="Junior Systems Analyst"
                company="Ciudad Maderas"
                dateRange="February 2020 - September 2022"
                tasks={[
                  "Maintenance, developing and testing of new features for different Swift mobile applications already published in the Apple and Google Play stores.",
                  "Implementation of Facebook Marketing tools to collect user statistics and improve the company's applications.",
                  "Collaborated with other programmers and designers to design new applications and websites for Ciudad Maderas.",
                  "Built and delivered technical solutions according to stakeholder business requirements."
                ]}
              />
              <ExperienceItem
                title="Independent App Developer"
                company="Waisoft"
                dateRange="November 2018 – December 2019"
                tasks={[
                  "Collaborated with designers and other developers to develop, maintain and ship production applications for clients from Argentina, Spain, and France.",
                  "Worked remotely using tools like Google Meet and GitHub to develop quality applications."
                ]}
              />
              <ExperienceItem
                title="Trainee"
                company="Truper"
                dateRange="January — June 2018"
                tasks={[
                  "Developed a Business Intelligence system to automate reporting tasks for the procurement department using C#, VBA from Microsoft, and ABAP from SAP."
                ]}
              />
            </Section>

            <Section title="Languages">
              <LanguageItem language="Spanish" proficiency="Native" />
              <LanguageItem language="English" proficiency="C1" />
            </Section>
          </Stack>
        </Grid>

        <Grid item spacing={2} md={12} xl={2}>
          <Stack>
            <ContactInfo
              email="aikoz_1@live.com"
              phone="+52 554 527 766 0"
              linkedin="https://www.linkedin.com/in/aikoz/"
            />

            <PersonalInfo
              age="29 years old"
              nationality="Mexican nationality"
              license="Driving license  → now"
            />

            <Address
              address="Av. del ferrocarril 12, San Sebastián, Santiago de Querétaro, Querétaro, México."
            />

            <Section title="Skills">
              <SkillCategory
                category="Programming Languages"
                skills="Swift, JavaScript, TypeScript, C#, VBA, PHP"
              />
              <SkillCategory
                category="Libraries and Frameworks"
                skills="Cocoapods, React, Node js, Laravel"
              />
              <SkillCategory
                category="Tools and platforms"
                skills="Git, Github, Zoom, Google meet, Firebase, Dropbox, Google Cloud Storage, Cincel, Salesforce, Slack, Metamap"
              />
            </Section>

            <Section title="Education">
              <EducationItem
                institution="ITESHU"
                details="Computer Systems Engineer, El saucillo, Huichapan, Hidalgo, México, 2013-2018"
              />
            </Section>

            <Section title="Selected projects">
              <ProjectItem
                title="Mantenimiento GPH"
                description="Application for payment of clients's real estate maintenance services"
              />
              <ProjectItem
                title="Pagos Ciudad maderas"
                description="Application for payment of clients's real estate monthly payments"
              />
              <ProjectItem
                title="Consulta referencia alexa skill"
                description="Skill to inquire customer’s real estate information from alexa devices"
              />
              <ProjectItem
                title="Socio maderas"
                description="Web and mobile applications where people can make investments."
              />
              <ProjectItem
                title="Suma"
                description="Web and mobile applications where people can invest on NFTs."
              />
            </Section>

            <Section title="Interests">
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
                Camping, Dancing, Final Fantasy Seven games (all of them) and independent films
              </Typography>
            </Section>
          </Stack>

        </Grid>
      </Grid>
      <Link

        to="/landingPage/portfolioContact/"
        style={{ textDecoration: 'none', color: 'lightgray' }}
      >
        <GlitchTypography text={'Contact me →'} />
      </Link>
    </Stack>



  )

}