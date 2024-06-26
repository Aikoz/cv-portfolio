import { Box, Card, CardMedia, Divider, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import Layout from "./Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { NuevoProyecto } from "../modals/NuevoProyecto";
import { useEffect, useState } from "react";
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

export function Proyectos() {
  const { setSharedTitle } = useOutletContext<OutletContextType>();  
  setSharedTitle('Proyectos');  

  const [projectsData, setProjectsData] = useState<any[]>([]);


  const deleteProject = async (index: any) => {

    const response = await fetch(server.dev_url +'/projects/delete_project', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idProyecto: index }),

    }).then((response) => response.json())

      .then((data) => {
        if (data[0].code) {
          getProjectData()
        } else {
          alert(data[0].message);

        }

      });

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
          
          setProjectsData(data[0].data);

        } else {
          alert(data[0].message);

        }

      });
  }

  useEffect(() => {
    getProjectData()
  }, [])




  return (


          <Grid container spacing={3}>
            <Grid item container xs={12}>
              <Grid item xs={10}>
                <Typography variant="h5">
                  Listado de  proyectos:
                </Typography>
              </Grid>
              <Grid item xs={2} >
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'right' }} >

                  <NuevoProyecto getProjectData={getProjectData} ></NuevoProyecto>

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
                        <TableCell >Nombre de proyecto </TableCell >
                        <TableCell align="left">Descripcion</TableCell >
                        <TableCell align="left">Ruta</TableCell>
                        <TableCell align="left">Tipo</TableCell>
                        <TableCell align="right">Eliminar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectsData.map((row) => (

                        <StyledTableRow
                          key={row.id_proyecto}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {row.id_proyecto}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.nombre}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row.descripcion}</StyledTableCell>
                          <StyledTableCell align="left">{row.ruta}</StyledTableCell>
                          <StyledTableCell align="left">{row.tipo_proyecto == 1 ? 'Aplicacion movil' : 'Aplicacion web'}</StyledTableCell>
                          {/* <TableCell align="right"><IconButton><EditNoteIcon></EditNoteIcon></IconButton></TableCell> */}
                          <StyledTableCell align="right"><IconButton onClick={() => { deleteProject(row.id_proyecto) }}><DeleteIcon></DeleteIcon></IconButton></StyledTableCell>
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