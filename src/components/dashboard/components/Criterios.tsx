import { Box, Grid, Paper, Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useOutletContext } from "react-router-dom";
import { server } from "../../../utils/constants";
import { NuevoCriterio } from "../modals/NuevoCriterio";
import { EditNote } from "@mui/icons-material";



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

export function Criterios() {

  const { setSharedTitle } = useOutletContext<OutletContextType>();

  setSharedTitle('Criterios');

  const [criterionData, setCriterionData] = useState<any[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editIndex, setEditIndex] = useState(false)
  const [projectsData, setProjectsData] = useState<any[]>([]);

  const deleteCriterio = async (index: any) => {

    const response = await fetch(server.dev_url + '/notifications/delete_criterio', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idCriterio: index }),

    }).then((response) => response.json())

      .then((data) => {
        if (data[0].code) {
          getCriterionData()
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

  const getCriterionData = async () => {

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
          setCriterionData(data[0].data)

        } else {
          alert(data[0].message);

        }

      });
      console.dir(response)

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
      console.dir(response)
  }

  useEffect(() => {
    getCriterionData()
    getProjectData()
  }, [])

  return (

    <Grid container spacing={3}>
      <Grid item container xs={12}>
        <Grid item xs={10}>
          <Typography variant="h5">
            Listado de  criterios:
          </Typography>
        </Grid>
        <Grid item xs={2} >
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'right' }} >

            <NuevoCriterio getCriterionData={getCriterionData}
              openEditModal={openEditModal}
              projectData={projectsData}
              setOpenEditModal={setOpenEditModal}
              criterionData={criterionData}
              editIndex={editIndex} ></NuevoCriterio>

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
                  <TableCell >Nombre de criterio </TableCell >
                  <TableCell align="left">Descripcion</TableCell >
                  <TableCell align="left">Proyecto</TableCell>
                  <TableCell align="left">Fecha</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="right">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {criterionData.map((row, index) => (

                  <StyledTableRow
                    key={row.id_criterio}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.id_criterio}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.titulo}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.descripcion}</StyledTableCell>
                    <StyledTableCell align="left">{row.nombre_proyecto}</StyledTableCell>
                    <StyledTableCell align="left">{row.fecha_criterio ? row.fecha_criterio : 'No se especifico'}</StyledTableCell>
                    {/* <StyledTableCell align="left">{row.nombre_parametro}</StyledTableCell> */}
                    <TableCell align="right"><IconButton onClick={() => onOpenEditModal(index)} ><EditNote></EditNote></IconButton></TableCell>
                    <StyledTableCell align="right"><IconButton onClick={() => { deleteCriterio(row.id_criterio) }}><DeleteIcon></DeleteIcon></IconButton></StyledTableCell>
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