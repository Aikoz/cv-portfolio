import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { Delete, EditNote } from "@mui/icons-material";
import { server } from "../../../utils/constants";
import { DateFormatter } from '../../../utils/dateFormatter'

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Libre Franklin, Arial, sans-serif',
  fontWeight: 200,
  fontSize: '20px',
  width: '70%',
  color: 'lightgray',
  // backgroundColor: 'green',
  // textAlign: 'center',
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
          getEnviosData()
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
    getEnviosData()
    getProjectData()
    getNotificationData()
    getTypeNotificationData()
    getCriteriaData()
    setSharedTitle('asd');

  }, [])



  return (
    <Grid container spacing={3}>
      <Typography
        sx={{
          fontFamily: 'Libre Franklin, Arial, sans-serif',
          fontWeight: '600',
          fontSize: '40px',
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
      <Box sx={{
        display:'flex',
        direction:'row',
        gap:'10px',
        width:'100%',
        alignItems: 'center', 
        justifyItems: 'center'
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
        // noWrap
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
    </Grid>
  )

}