import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { Delete, EditNote } from "@mui/icons-material";
import { server } from "../../../utils/constants";
import {DateFormatter} from '../../../utils/dateFormatter'
import { NuevoEnvio } from "../modals/NuevoEnvio";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

interface OutletContextType {
    setSharedTitle: (title: string) => void;
  }

export function HomePage () {
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
  
      const response = await fetch(server.dev_url +'/notifications/delete_envio', {
  
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
        console.dir(response)

  
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
        console.dir(response)

    }
  
    const getEnviosData = async () => {
      console.dir('getting envios')
      const response = await fetch(server.dev_url +'/notifications/get_envios', {
  
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
        console.dir(response)

    }

    const getProjectData = async () => {


      const response = await fetch(server.dev_url +'/projects/get_projects', {
  
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
        console.dir(response)

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
        console.dir(response)

    }

    const getNotificationData = async () => {

      const response = await fetch(server.dev_url +'/notifications/get_notifications', {
  
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
        console.dir(response)

    }

    useEffect(() => {
      getEnviosData()
      getProjectData()
      getNotificationData()
      getTypeNotificationData()
      getCriteriaData()


    }, [])
  
    setSharedTitle('Envios activos');    
    
    return(    
        <Grid container spacing={3}>
        <Grid item container xs={12}>
          <Grid item xs={10}>
            <Typography variant="h5">
              Listado de envios:
            </Typography>
          </Grid>
          <Grid item xs={2} >
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'right' }} >

            <NuevoEnvio getEnviosData={getEnviosData} 
                                enviosData={enviosData}
                                openEditModal={openEditModal} 
                                setOpenEditModal={setOpenEditModal} 
                                plantillaData={notificationsData}
                                criteriaData={criteriaData}
                                setCriteriaData={setCriteriaData}
                                getCriteriaData={getCriteriaData}
                                projectData={projectsData} 
                                typeNoficationData={typeNoficationData}
                                editIndex={editIndex} ></NuevoEnvio>

            </Box>


          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                  <TableCell align="left">Estatus de envio de plantilla</TableCell >
                  <TableCell align="left">Enviado</TableCell >
                    <TableCell align="left">Nombre de plantilla </TableCell >
                    <TableCell align="left">Fecha de inicio</TableCell >
                    <TableCell align="left">Fecha de fin</TableCell>
                    <TableCell align="left">Tipo</TableCell>
                    <TableCell align="right">Editar</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enviosData.map((row, index) => (

                    <StyledTableRow
                      key={row.id_envio}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell scope="row">
                       <Chip variant='filled' color={row.estatus_de_envio == 2 ? 'warning' : 'success'} label={row.estatus_de_envio == 2 ? 'DESACTIVADA' : 'LISTA PARA ENVIAR'} sx={{ maxWidth:'200px', height:'25px', color: 'white', padding: '5px', borderRadius: '5px', alignItems: 'center', justifyItems:'center'}}></Chip> 
                      </StyledTableCell>
                      <StyledTableCell  scope="row">
                        {row.ultimo_envio != null ? DateFormatter( row.ultimo_envio) : 'Aun no se ha enviado'}
                      </StyledTableCell>
                      <StyledTableCell scope="row">
                        {row.titulo}
                      </StyledTableCell>
                      <StyledTableCell align="left">{DateFormatter( row.fecha_inicio)}</StyledTableCell>
                      <StyledTableCell align="left">{DateFormatter( row.fecha_fin)}</StyledTableCell>
                      <StyledTableCell align="left">{row.tipo_notificacion}</StyledTableCell>
                      <StyledTableCell align="right"><IconButton onClick={() => onOpenEditModal(index)} ><EditNote></EditNote></IconButton></StyledTableCell>
                      <StyledTableCell align="right"><IconButton onClick={() => { deleteEnvio(row.id_envio) }}><Delete></Delete></IconButton></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

        </Grid>
      </Grid>
    )

}