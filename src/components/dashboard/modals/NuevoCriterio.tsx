import { FormEvent, useEffect, useState } from 'react';
import { Box, 
    Button, 
    Card, 
    CardContent, 
    FormControl, 
    Grid, 
    IconButton, 
    InputLabel, 
    MenuItem, 
    Modal, 
    Paper, 
    Select, 
    SelectChangeEvent, 
    Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';
import { Delete, PostAdd } from '@mui/icons-material';
// import dayjs from 'dayjs';
import { server } from '../../../utils/constants'


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


interface CriteriaData {
    key: number;
    nombreDato: string;
    parametro: string;
    prioridad: string;
    prioridadId: number;
}

export const NuevoCriterio = (props: any) => {


    const { criterionData, getCriterionData, projectData, editIndex, openEditModal, setOpenEditModal } = props;

    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');


    // const today = dayjs();

    // TODO: juntar totos los usestates booleanos en un array de valores
    const [proyecto, setProyecto] = useState('')
    const [proyectoId, setProyectoId] = useState(0)

    const [nombreDato, setNombreDato] = useState('')
    const [parametroDato, setParametroDato] = useState('')
    const [prioridad, setPrioridad] = useState('')
    const [prioridadId, setPrioridadId] = useState(0)
    const [contador, setContador] = useState(0)
    const [criteriaData, setCriteriaData] = useState<CriteriaData[]>([]);
    const [prioridadData] = useState([{ id_nombre: 1, name: 'Principal' },
    { id_nombre: 2, name: 'Fecha' },
    { id_nombre: 3, name: 'Secundario' }])


    useEffect(() => {
        if (openEditModal) {
            //Edición
            setCriteriaData([])
            setTitulo(criterionData[editIndex].titulo)
            setDescripcion(criterionData[editIndex].descripcion)
            setProyecto(criterionData[editIndex].nombre_proyecto)
            setProyectoId(criterionData[editIndex].id_proyecto)
            criterionData[editIndex].listaDatos.forEach((element: any) => {
                const newData: CriteriaData = {
                    key: element.id_dato_criterio,
                    nombreDato: element.titulo,
                    parametro: element.parametro,
                    prioridad: element.prioridad == 1 ? 'Principal' : element.prioridad == 2 ? 'Fecha' : element.prioridad == 3 ? 'Secundaria' : 'x',
                    prioridadId: element.prioridad
                };

                setCriteriaData((data) => [...data, newData]);
            });

            handleOpen()

        }
        else {
            //limpieza de modal
            setTitulo('')
            setDescripcion('')
            setProyecto('')
            setProyectoId(0)
            //lIMPIANDO SECCION DE ADICION DE PARAMETROS
            setCriteriaData([])
            setNombreDato('')
            setParametroDato('')
            setPrioridad('')
            setPrioridadId(0)


        }
    }, [openEditModal, editIndex, open])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpenEditModal(false);
        setOpen(false);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        var continueVariation = false;
        criteriaData.find((element) => {

            if (element.prioridad === 'Principal') {
                continueVariation = true
                return false
            }

        })

        if (!continueVariation) {
            alert('Ingresa un dato de criterio de tipo principal para contunuar')

            return
        }

        if (openEditModal) {


            const response = await fetch(server.dev_url + '/notifications/update_criterio', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idCriterio: criterionData[editIndex].id_criterio,
                    titulo: titulo,
                    descripcion: descripcion,
                    idProyecto: proyectoId,
                    activo: 1,
                    criteriaDataList: criteriaData
                }),

            }).then((response) => {

                if (!response.ok) {
                    alert("Error desconocido.");
                }
                return response.json()
            })
                .then((data) => {
                    console.dir(data)
                    if (data[0].code == 1) {
                        getCriterionData()

                    } else {

                        alert(data[0].message);

                    }
                });

            console.dir(response)

            handleClose();

        } else {




            if (proyecto == '' || proyecto == 'Campo requerido') {
                setProyecto('Campo requerido')
                alert('Selecciona un proyecto para continuar')
                return
            }

            const response = await fetch(server.dev_url + '/notifications/create_criterio', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: titulo,
                    descripcion: descripcion,
                    idProyecto: proyectoId,
                    criteriaDataList: criteriaData
                }),

            }).then((response) => {

                if (!response.ok) {
                    alert("Error desconocido.");
                }
                return response.json()
            })
                .then((data) => {
                    if (data[0].code == 1) {
                        getCriterionData()

                    } else {

                        alert(data[0].message);

                    }
                });
            console.dir(response)

            handleClose();

        }
    };

    const handleSelectProyecto = (event: SelectChangeEvent<typeof proyecto>, key: any) => {

        const itemKey = key.key.slice(2);
        setProyecto(event.target.value);
        setProyectoId(itemKey);

    };

    const handleSelectPrioridad = (event: SelectChangeEvent<typeof proyecto>, key: any) => {

        const itemKey = key.key.slice(2);
        setPrioridad(event.target.value);
        setPrioridadId(itemKey);

    };

    const handleDeleteCriteriaData = (key: any) => () => {


        //setChipData((chips) => chips.filter((chip) => chip.key !== itemKey));

        setCriteriaData((criteriaData) => criteriaData.filter((data) => data.key !== key));

        // const newAvailableName: any = { id_criterio: chipToDelete.key, titulo: chipToDelete.label };

        // setCriteriaData((criteriaData: any) => [...criteriaData, newAvailableName]);
    };

    function handleAddDato() {


        if (criteriaData.find((element) => {
            return element.nombreDato === nombreDato;
        })
            &&
            criteriaData.find((element) => {
                return element.parametro === parametroDato;
            })
        ) {
            alert('Datos repetidos para el nuevo dato')

            return
        }


        if (nombreDato != '' && prioridadId != 0 && parametroDato != ''
        ) {
            const newData: CriteriaData = { key: contador, prioridad: prioridad, prioridadId: prioridadId, nombreDato: nombreDato, parametro: parametroDato };
            setContador(contador + 1)
            setCriteriaData((data) => [...data, newData]);
            setNombreDato('')
            setParametroDato('')
            setPrioridad('')
            setPrioridadId(0)

        } else {
            alert('Campos vacios para el nuevo dato')
        }
    };

    return (
        <div>

            <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOpen}>Crear nuevo criterio</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="form-modal"
                aria-describedby="form-modal-description"
            >

                <Box
                    sx={{
                        transition: 'width 0.5s ease',
                        width: '90vw',
                        maxHeight: '90vh', borderRadius: 3, m: 'auto', marginTop: '2%'
                    }}
                >
                    <Card variant="outlined" sx={{}}>
                        <CardContent>

                            <Box style={{ maxHeight: '80vh', overflowY: 'auto', padding: '0px 40px 40px 40px', gap: '35px' }}>
                                <form onSubmit={handleSubmit}>
                                    <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Grid container spacing={3}>

                                            <Grid item xs={12} style={{
                                                transition: 'all 0.4s ease',
                                                overflow: 'hidden'
                                            }} >
                                                <Typography mt={2} align='center' pt={2} variant='h5' >Datos para el nuevo criterio:</Typography>

                                                <Tab sx={{ minHeight: '20px', minWidth: '100%' }}
                                                    label={<div>   <Typography variant="caption">
                                                        Llena los datos para el nuevo criterio:
                                                    </Typography></div>}
                                                />

                                                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px' }} >


                                                    <TextField
                                                        required
                                                        label="Nombre de criterio"
                                                        fullWidth
                                                        value={titulo}
                                                        onChange={(e) => setTitulo(e.target.value)}
                                                    />

                                                    <TextField
                                                        required
                                                        label="Descripción"
                                                        fullWidth
                                                        value={descripcion}
                                                        multiline
                                                        rows={3}
                                                        onChange={(e) => setDescripcion(e.target.value)}
                                                    />

                                                    <FormControl fullWidth>
                                                        <InputLabel id="project-label">Proyecto: </InputLabel>

                                                        <Select
                                                            labelId='project-label'
                                                            fullWidth
                                                            value={proyecto}

                                                            label={'Aplicación para el envio:'}
                                                            onChange={handleSelectProyecto}
                                                        >
                                                            {projectData.map((project: any) => (
                                                                <MenuItem
                                                                    key={project.id_proyecto}
                                                                    value={project.nombre}
                                                                >
                                                                    {project.nombre}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>


                                                </Box>


                                            </Grid>
                                            <Grid item xs={4} style={{
                                                transition: 'all 0.4s ease',
                                                overflow: 'hidden'
                                            }} >

                                                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px', borderColor: 'white', border: '1px solid', padding: '15px', borderRadius: '15px' }} >

                                                    <Tab sx={{ minHeight: '20px', minWidth: '100%' }}
                                                        label={<div>   <Typography variant="caption">
                                                            Datos para el criterio:
                                                        </Typography></div>}
                                                    />

                                                    <TextField

                                                        label="Nombre de dato:"
                                                        fullWidth
                                                        value={nombreDato}
                                                        onChange={(e) => setNombreDato(e.target.value)}
                                                    />

                                                    <TextField

                                                        label="Parametro:"
                                                        fullWidth
                                                        value={parametroDato}
                                                        onChange={(e) => setParametroDato(e.target.value)}
                                                    />

                                                    <FormControl fullWidth>
                                                        <InputLabel id="project-label">Prioridad: </InputLabel>

                                                        <Select
                                                            labelId='project-label'
                                                            fullWidth
                                                            value={prioridad}

                                                            label={'Aplicación para el envio:'}
                                                            onChange={handleSelectPrioridad}
                                                        >
                                                            {prioridadData.map((project: any) => (
                                                                <MenuItem
                                                                    key={project.id_nombre}
                                                                    value={project.name}
                                                                >
                                                                    {project.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>


                                                    <Box>
                                                        <Button variant="contained" color="success" endIcon={<PostAdd />} onClick={() => { handleAddDato() }} >Agregar dato</Button>
                                                    </Box>
                                                </Box>

                                            </Grid>

                                            <Grid item xs={8} style={{
                                                transition: 'all 0.4s ease',
                                                overflow: 'hidden'
                                            }} >

                                                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '10px' }} >
                                                    <Paper sx={{ minWidth: '100%' }}>
                                                        <TableContainer component={Paper} >
                                                            <Table aria-label="simple table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell align="left">ID</TableCell >
                                                                        <TableCell align="left">Nombre de dato</TableCell >
                                                                        <TableCell align="left">Parametro</TableCell >
                                                                        <TableCell align="left">Prioridad </TableCell >
                                                                        <TableCell align="center">Eliminar </TableCell >
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {criteriaData.map((row) => (

                                                                        <StyledTableRow
                                                                            key={row.key}
                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                        >
                                                                            <StyledTableCell align="left">{row.key}</StyledTableCell>
                                                                            <StyledTableCell align="left">{row.nombreDato}</StyledTableCell>
                                                                            <StyledTableCell align="left">{row.parametro}</StyledTableCell>
                                                                            <StyledTableCell align="left">{row.prioridad}</StyledTableCell>
                                                                            <StyledTableCell align="center"><IconButton onClick={
                                                                                handleDeleteCriteriaData(row.key)
                                                                            }><Delete></Delete></IconButton></StyledTableCell>

                                                                        </StyledTableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Paper>
                                                </Box>

                                            </Grid>


                                        </Grid>
                                        <Box mt={5}>
                                            <Button type="submit" variant="contained" color="primary" >{!openEditModal ? 'Guardar criterio' : 'Actualizar criterio'}</Button>
                                        </Box>
                                    </Box>

                                </form>

                            </Box>
                        </CardContent>
                    </Card>
                </Box>

            </Modal>
        </div>
    )
}

