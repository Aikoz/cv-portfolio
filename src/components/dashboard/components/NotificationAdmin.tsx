import { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { NuevaPlantilla } from "../modals/NuevaPlantilla";
import { useOutletContext } from "react-router-dom";
import { server } from "../../../utils/constants";

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

export function NotificationAdmin() {

  const { setSharedTitle } = useOutletContext<OutletContextType>();
  setSharedTitle('Plantillas de notificacion');

  const [notificationsData, setNotificationsData] = useState<any[]>([]);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [criteriaData, setCriteriaData] = useState<any[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editIndex, setEditIndex] = useState(false)
  const [typeNoficationData, setTypeNotificationData] = useState<any[]>([]);

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
        if (data[0].code) {

          setNotificationsData(data[0].data);

        } else {

          alert(data[0].message);

        }

      });
      console.dir(response)

  }

  function setImage (image: any){


    // Suponiendo que tienes un objeto con la estructura { type: "Buffer", data: [...] }
    const bufferObject = image // Ejemplo de objeto buffer
    if (bufferObject == null) {
      return
  }
    // Convertir el objeto buffer en un Uint8Array
    const uint8Array = new Uint8Array(bufferObject.data);

    // Crear un Blob a partir del Uint8Array
    const blob = new Blob([uint8Array]);

    // Crear un objeto File a partir del Blob (opcional, si necesitas un objeto File)
    const file = new File([blob], 'archivo.png', { type: 'image/png' });

    // Crear un objeto FileReader
    const fileReader = new FileReader();

    // Configurar el evento onload del FileReader para obtener la URL de datos
    fileReader.onload = (event) => {
      if( event.target) {
        const dataURL = event.target.result ?? "";
        return dataURL
      }
        
    };

    // Leer el contenido del archivo como URL de datos
    fileReader.readAsDataURL(file);

};

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
  
        if (data[0].code) {

          setCriteriaData(data[0].data)

        } else {

          alert(data[0].message);

        }

      });
      console.dir(response)

  }

  const onOpenEditModal = (index: any) => {
    setEditIndex(index)
    setOpenEditModal(true)
  }

  const deleteNotification = async (index: any) => {

    const response = await fetch(server.dev_url + '/notifications/delete_notification', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idNotification: index }),

    }).then((response) => response.json())

      .then((data) => {


        if (data[0].code) {

          getNotificationData()

        } else {
          alert(data[0].message);

        }

      });
      console.dir(response)

  }

  const handleSwitchChange = (index: any, index_tb: any) => (event: any) => {
    const newRows = [...notificationsData];

    newRows[index].estatus_de_envio = event.target.checked == true ? 1 : 2;
    setNotificationsData(newRows);
    updateRow(event.target.checked == true ? 1 : 2, index_tb)
  };

  const updateRow = async (value: any, index: any) => {

    const response = await fetch(server.dev_url + '/notifications/update_notificacion', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idNotificacion: index,
        estatusDeEnvio: value
      }),

    }).then((response) => response.json())

      .then((data) => {

        if (data[0].code) {

          getNotificationData()

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



  useEffect(() => {
    getNotificationData()
    getProjectData()
    getCriteriaData()
    getTypeNotificationData()
  }, [])

  return (


    <Grid container spacing={3}>

      <Grid item container xs={12}>
        <Grid item xs={10}>
          <Typography variant="h5">
            Listado de plantillas:
          </Typography>
        </Grid>
        <Grid item xs={2} >
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'right' }}>

            <NuevaPlantilla getNotificationData={getNotificationData}
              notificationsData={notificationsData}
              openEditModal={openEditModal}
              setOpenEditModal={setOpenEditModal}
              projectData={projectsData}
              criteriaData={criteriaData}
              setCriteriaData={setCriteriaData}
              typeNoficationData={typeNoficationData}
              editIndex={editIndex} ></NuevaPlantilla>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >ID </TableCell >
                  <TableCell >Titulo </TableCell >
                  <TableCell align="left">Descripcion</TableCell >
                  <TableCell align="left">Imagen</TableCell>
                  <TableCell align="left">Ruta accion</TableCell>
                  <TableCell align="right">Notificación activa</TableCell>
                  <TableCell align="right">Editar</TableCell>
                  <TableCell align="right">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {notificationsData.map((row, index) => (

                  <StyledTableRow
                    key={row.id_notificacion}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0, width: 100,
                        maxWidth: 100,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.id_notificacion}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.titulo}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.descripcion}</StyledTableCell>
                    <StyledTableCell align="left">
                      <img src={`${setImage(row.imagen)}`}
                        alt="La imagen no se pudo cargar"
                        loading="lazy"
                        style={{
                          height: "40px",
                          marginRight: "15px",
                          borderRadius: '10px'
                        }} />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    <Box textAlign='center'>
                      <Button href={row.action_url} target="_blank" variant="outlined" color="success">
                        Acción de notificación
                      </Button></Box></StyledTableCell>
                    <StyledTableCell align="right"><Switch checked={row.estatus_de_envio == 1 ? true : false} onChange={handleSwitchChange(index, row.id_notificacion)}></Switch> </StyledTableCell>

                    <StyledTableCell align="right"><IconButton onClick={() => onOpenEditModal(index)} ><EditNoteIcon></EditNoteIcon></IconButton></StyledTableCell>
                    <StyledTableCell align="right"><IconButton onClick={() => { deleteNotification(row.id_notificacion) }} ><DeleteIcon></DeleteIcon></IconButton></StyledTableCell>
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