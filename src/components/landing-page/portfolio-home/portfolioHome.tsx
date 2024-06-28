import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { Delete, EditNote } from "@mui/icons-material";
import { server } from "../../../utils/constants";
import { DateFormatter } from '../../../utils/dateFormatter'

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Libre Franklin, Arial, sans-serif',
  fontWeight: 200,
  fontSize: '20px',
  width: '70%',
  color: 'lightgray'
}));

interface OutletContextType {
  setSharedTitle: (title: string) => void;
}

export function PortfolioHome() {

  const { setSharedTitle } = useOutletContext<OutletContextType>();
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editIndex, setEditIndex] = useState(false)
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [enviosData, setEnviosData] = useState<any[]>([]);
  const [notificationsData, setNotificationsData] = useState<any[]>([]);
  const [typeNoficationData, setTypeNotificationData] = useState<any[]>([]);
  const [criteriaData, setCriteriaData] = useState<any[]>([]);

  const onOpenEditModal = (index: any) => {
    setEditIndex(index)
    setOpenEditModal(true)
  }

  const deleteEnvio = async (index: any) => {

    const response = await fetch(server.dev_url + '/notifications/delete_envio', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idEnvio: index }),

    }).then((response) => response.json())

      .then((data) => {
        console.dir(data)
        if (data[0].code) {
          // getEnviosData()
        } else {
          alert(data[0].message);

        }

      });

  }
  const getTypeNotificationData = async () => {


    const response = await fetch(server.dev_url + '/notifications/get_type_notification', {

      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }).then((response) => {

      if (!response.ok) {
        alert("Error desconocido.");
      }
      return response.json()
    })
      .then((data) => {

        if (data[0].code) {

          setTypeNotificationData(data[0].data)

        } else {

          alert(data[0].message);

        }

      });
  }

  const getEnviosData = async () => {
    console.dir('getting envios')
    const response = await fetch(server.dev_url + '/notifications/get_envios', {

      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }).then((response) => {

      console.dir(response)

      if (!response.ok) {
        alert("Error desconocido.");
      }
      return response.json()
    })
      .then((data) => {
        console.dir(data)
        if (data[0].code) {

          setEnviosData(data[0].data)

        } else {

          alert(data[0].message);

        }

      });
  }

  const getProjectData = async () => {


    const response = await fetch(server.dev_url + '/projects/get_projects', {

      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }).then((response) => {

      if (!response.ok) {
        alert("Error desconocido.");
      }
      return response.json()
    })
      .then((data) => {


        if (data[0].code) {

          setProjectsData(data[0].data)

        } else {

          alert(data[0].message);

        }

      });
  }

  const getCriteriaData = async () => {


    const response = await fetch(server.dev_url + '/notifications/get_criterios', {

      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }).then((response) => {

      if (!response.ok) {

        alert("Error desconocido.");

      }
      return response.json()
    })
      .then((data) => {

        console.dir('criterios')
        console.dir(data)
        if (data[0].code) {

          setCriteriaData(data[0].data)

        } else {

          alert(data[0].message);

        }

      });
  }

  const getNotificationData = async () => {

    const response = await fetch(server.dev_url + '/notifications/get_notifications', {

      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    }).then((response) => {

      if (!response.ok) {
        alert("Error desconocido.");
      }
      return response.json()
    })
      .then((data) => {
        console.dir(data);

        if (data[0].code) {

          setNotificationsData(data[0].data);

        } else {

          alert(data[0].message);

        }

      });
  }

  useEffect(() => {
    // getEnviosData()
    // getProjectData()
    // getNotificationData()
    // getTypeNotificationData()
    // getCriteriaData()
    setSharedTitle('asd');

  }, [])



  return (

    <Grid container direction={'row'} spacing={2}>
      <Grid item spacing={2}>
        <Stack>
          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '600',
              fontSize: '45px',
              width: '70%',
              color: 'green'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            José Luis Florencio Ortíz
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: '70%',
              color: 'lightgray'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Senior Systems Analyst with a focus on mobile applications, Swift application developer expert
          </Typography>

          <Typography
            mt={2}
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '800',
              fontSize: '25px',
              width: '70%',
              color: 'green'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Relevant experience
          </Typography>

          {/* pharagraphs::::::::::::::::::::::::::::::::::::: */}
          <Stack gap={2} mt={2}>

            <Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Senior Systems Analyst
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Ciudad Maderas
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  September 2022 - Today

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Maintenance, developing and testing of new mobile applications integrating polished interfaces to ensure content Experience, responsiveness, video quality, audio quality, and functional stability
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Unlisted app distribution on Apple Connect platform for a new created mobile application that needs to be distributed among clients and employees of the company for whom we do not have access to their devices
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Developed and ship web back-end and front-end web apps using node and react technologies
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Alexa skill developed to bring Ciudad Maderas’s customers with an easy way to consult information about their land
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Collaborated with a salesforce team to integrate a react project and a swift application with one of their solutions where we ended using  also Cincel, Google cloud Storage and Metamap to bring an entirely digital investing platform
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Developed a react app and a Swift app for an NFT investing platform
                </Typography>

              </Box>
            </Box>

            <Box>


              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Junior Systems Analyst
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Ciudad Maderas
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  February 2020 - September 2022

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Maintenance, developing and testing of new features for different Swift mobile applications already published in the apple and Google play stores
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Implementation of Facebook Marketing tools to collect user statistics and use them to improve the company's different applications
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%',

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Collaborated with other programmers and designers to design new applications and websites for Ciudad Maderas
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Built and delivered technical solutions according to stakeholder business requirements
                </Typography>

              </Box>

            </Box>

            <Box>


              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Independent App Developer
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Waisoft
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  November 2018 – December 2019

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Collaborated with designers and other developers to develop, maintain and ship production applications for different clients from countries like Argentina, Spain and France
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Work from home and using tools like google meet and github to develop quality applications
                </Typography>

              </Box>
            </Box>

            <Box>


              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Trainee
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Truper
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  January — june 2018

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Developed a Business Intelligence system to automate reporting tasks for the procurement department using C#, VBA from Microsoft and ABAP from SAP
                </Typography>
              </Box>

            </Box>


          </Stack>

          <Typography
            mt={2}
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '800',
              fontSize: '25px',
              width: '70%',
              color: 'green'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Languages
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: 'auto',
              color: 'white'
            }}
          >
            Spanish → native
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: 'auto',
              color: 'white'
            }}
          >
            English →  C1
          </Typography>
        </Stack>
      </Grid>
      <Grid item spacing={2}>
        <Stack>
          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '600',
              fontSize: '45px',
              width: '70%',
              color: 'green'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            José Luis Florencio Ortíz
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: '70%',
              color: 'lightgray'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Senior Systems Analyst with a focus on mobile applications, Swift application developer expert
          </Typography>

          <Typography
            mt={2}
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '800',
              fontSize: '25px',
              width: '70%',
              color: 'green'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Relevant experience
          </Typography>

          {/* pharagraphs::::::::::::::::::::::::::::::::::::: */}
          <Stack gap={2} mt={2}>

            <Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Senior Systems Analyst
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Ciudad Maderas
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  September 2022 - Today

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Maintenance, developing and testing of new mobile applications integrating polished interfaces to ensure content Experience, responsiveness, video quality, audio quality, and functional stability
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Unlisted app distribution on Apple Connect platform for a new created mobile application that needs to be distributed among clients and employees of the company for whom we do not have access to their devices
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Developed and ship web back-end and front-end web apps using node and react technologies
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Alexa skill developed to bring Ciudad Maderas’s customers with an easy way to consult information about their land
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Collaborated with a salesforce team to integrate a react project and a swift application with one of their solutions where we ended using  also Cincel, Google cloud Storage and Metamap to bring an entirely digital investing platform
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Developed a react app and a Swift app for an NFT investing platform
                </Typography>

              </Box>
            </Box>

            <Box>


              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Junior Systems Analyst
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Ciudad Maderas
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  February 2020 - September 2022

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Maintenance, developing and testing of new features for different Swift mobile applications already published in the apple and Google play stores
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Implementation of Facebook Marketing tools to collect user statistics and use them to improve the company's different applications
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%',

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Collaborated with other programmers and designers to design new applications and websites for Ciudad Maderas
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Built and delivered technical solutions according to stakeholder business requirements
                </Typography>

              </Box>

            </Box>

            <Box>


              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Independent App Developer
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Waisoft
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  November 2018 – December 2019

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Collaborated with designers and other developers to develop, maintain and ship production applications for different clients from countries like Argentina, Spain and France
                </Typography>

              </Box>
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Work from home and using tools like google meet and github to develop quality applications
                </Typography>

              </Box>
            </Box>

            <Box>


              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '10px',
                width: '100%',
                alignItems: 'center',
                justifyItems: 'center',
                marginBottom: '20px'
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Trainee
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  ·
                </Typography>
                <Typography

                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Truper
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '15px',
                    textAlign: 'bottom',
                    width: 'auto',
                    color: 'lightgray'
                  }}
                >
                  January — june 2018

                </Typography>
              </Box>
              {/* body::::::::::::::::::::::::::::::::::::: */}
              <Box sx={{
                display: 'flex',
                direction: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'top',
                justifyItems: 'center',

              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    width: 'auto',
                    marginLeft: '30px',
                    color: 'white',
                    textAlign: 'top',
                    textJustify: 'top',
                    height: '100%'

                  }}
                >
                  ●
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: '200',
                    fontSize: '20px',
                    width: 'auto',
                    color: 'white'
                  }}
                >
                  Developed a Business Intelligence system to automate reporting tasks for the procurement department using C#, VBA from Microsoft and ABAP from SAP
                </Typography>
              </Box>

            </Box>


          </Stack>

          <Typography
            mt={2}
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '800',
              fontSize: '25px',
              width: '70%',
              color: 'green'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Languages
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: 'auto',
              color: 'white'
            }}
          >
            Spanish → native
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: 'auto',
              color: 'white'
            }}
          >
            English →  C1
          </Typography>
        </Stack>
      </Grid>
      <Grid item spacing={2}>

      </Grid>
    </Grid>

  )

}