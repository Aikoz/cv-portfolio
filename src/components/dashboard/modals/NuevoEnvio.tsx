import { FormEvent, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Collapse, FormControl, FormControlLabel, FormHelperText, Grid, 
    InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Switch, Tab, TextField, Typography, styled } from '@mui/material';
// import { FormatAlignJustify } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
import { server } from '../../../utils/constants';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import NotificationsIcon from '../../../assets/alarm.png';
import NotificationsSlashIcon from '../../../assets/mute.png';
import { DateFormatterDateType } from '../../../utils/dateFormatter';
import { NotificationPreview } from '../components/reusable-components/NotificationPreview';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

interface ChipData {
    key: number;
    label: string;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('${NotificationsIcon}')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#008890' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('${NotificationsSlashIcon}')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

export const NuevoEnvio = (props: any) => {
    const { getEnviosData, projectData, enviosData, editIndex, openEditModal, setOpenEditModal, plantillaData, criteriaData, setCriteriaData, typeNoficationData, getCriteriaData } = props;

    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [rutaImagen, setRutaImagen] = useState('');
    const [rutaAccion, setRutaAccion] = useState('');

    const today = dayjs();

    const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(today);
    const [fechaFin, setFechaFin] = useState<Dayjs | null>(today.add(1, 'day')); // TODO: validar fecha fin que sea mayor a fecha inicio por un dia al menos 

    const [lunes, setLunes] = useState(false)
    const [martes, setMartes] = useState(false)
    const [miercoles, setMiercoles] = useState(false)
    const [jueves, setJueves] = useState(false)
    const [viernes, setViernes] = useState(false)
    const [sabado, setSabado] = useState(false)
    const [domingo, setDomingo] = useState(false)       // TODO: juntar totos los usestates booleanos en un array de valores
    const [proyecto, setProyecto] = useState('')
    const [proyectoId, setProyectoId] = useState(0)
    const [plantilla, setPlantilla] = useState('')
    const [plantillaId, setPlantillaId] = useState(0)
    const [typeNotification, setTypeNotification] = useState('');
    const [typeNotifictionId, setTypeNotificationId] = useState(0);
    const [chipData, setChipData] = useState<ChipData[]>([]);

    // const [checkList, setCheckList] = useState(() => { Array(9).fill(null) })

    // const theme = useTheme();
    // const [personName, setPersonName] = React.useState<string[]>([]);
    const [previewUrl] = useState<string | null>(null);



    useEffect(() => {
        getCriteriaData()
        if (openEditModal) {
            setChipData([])
            console.dir(enviosData[editIndex])
            setProyecto(enviosData[editIndex].nombre_proyecto)
            setProyectoId(enviosData[editIndex].id_proyecto);
            setPlantilla(enviosData[editIndex].id_notificacion + ' - ' + enviosData[editIndex].titulo)
            setPlantillaId(enviosData[editIndex].id_notificacion)
            setTitulo(enviosData[editIndex].titulo)
            setDescripcion(enviosData[editIndex].descripcion)
            setRutaImagen(enviosData[editIndex].imagen)
            setRutaAccion(enviosData[editIndex].action_url)
            setFechaInicio(DateFormatterDateType(enviosData[editIndex].fecha_inicio))
            setFechaFin(DateFormatterDateType(enviosData[editIndex].fecha_fin))
            // let tipoNotif = enviosData[editIndex].id_tipo_notificacion;
            setLunes(enviosData[editIndex].dia_lunes == 1 ? true : false)
            setMartes(enviosData[editIndex].dia_martes == 1 ? true : false)
            setMiercoles(enviosData[editIndex].dia_miercoles == 1 ? true : false)
            setJueves(enviosData[editIndex].dia_jueves == 1 ? true : false)
            setViernes(enviosData[editIndex].dia_viernes == 1 ? true : false)
            setSabado(enviosData[editIndex].dia_sabado == 1 ? true : false)
            setDomingo(enviosData[editIndex].dia_domingo == 1 ? true : false)
            setTypeNotification(enviosData[editIndex].tipo_notificacion)
            setTypeNotificationId(enviosData[editIndex].id_tipo_notificacion)
            if (enviosData[editIndex].criterios_array) {
                enviosData[editIndex].criterios_array.forEach((chip: { titulo: any; id_criterio: any; }) => {
                    const label = chip.titulo;
                    const itemKey = chip.id_criterio;
                    if (label) {
                        const newChip: ChipData = { key: itemKey, label };
                        setChipData((chips) => [...chips, newChip]);
                        setCriteriaData(() => criteriaData.filter((criteriaData: any) => criteriaData.titulo !== label));
                    }
                });
            }
            setImage(enviosData[editIndex].imagen)
            handleOpen()
        }
        else {

            setTitulo('')
            setDescripcion('')
            setRutaImagen('')
            setRutaAccion('')
            setProyecto('')
            setPlantilla('')
            setLunes(false)
            setMartes(false)
            setMiercoles(false)
            setJueves(false)
            setViernes(false)
            setSabado(false)
            setDomingo(false)
            setChipData([])
            setTypeNotification('')



        }
    }, [openEditModal, editIndex, open])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpenEditModal(false);
        setOpen(false);
    }

    // const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);

    const setImage = (image: any) => {


        // Suponiendo que tienes un objeto con la estructura { type: "Buffer", data: [...] }
        const bufferObject = image // Ejemplo de objeto buffer
        if (bufferObject == null) {
            console.dir('null==============================')
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
            if(event.target){
                const dataURL = event.target.result;
                console.log('DataURL:', dataURL);
                // setPreviewUrl(dataURL != null ? dataURL : previewUrl) 
            }

        };

        // Leer el contenido del archivo como URL de datos
        fileReader.readAsDataURL(file);

    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (openEditModal) {

            const response = await fetch(server.dev_url + '/notifications/update_envio', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idEnvio: enviosData[editIndex].id_envio,
                    idNotificacion: plantillaId,
                    titulo: titulo,
                    descripcion: descripcion,
                    rutaImagen: rutaImagen,
                    rutaAccion: rutaAccion,
                    idConfiguracion: enviosData[editIndex].id_configuracion,
                    lunes: lunes,
                    martes: martes,
                    miercoles: miercoles,
                    jueves: jueves,
                    viernes: viernes,
                    sabado: sabado,
                    domingo: domingo,
                    fechaInicio: fechaInicio?.format('YYYY-MM-DDTHH:mm:ss'),
                    fechaFin: fechaFin?.format('YYYY-MM-DDTHH:mm:ss'),
                    idProyecto: proyectoId,
                    idTipoNotificacion: typeNotifictionId,
                    criterios: chipData

                }),

            }).then((response) => {

                if (!response.ok) {
                    alert("Error desconocido.");
                }
                return response.json()
            })
                .then((data) => {
                    console.dir(data)
                    // setLoading(false);
                    if (data[0].code == 1) {
                        getEnviosData()

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

            const response = await fetch(server.dev_url + '/notifications/create_envio', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: titulo,
                    descripcion: descripcion,
                    rutaImagen: rutaImagen,
                    rutaAccion: rutaAccion,
                    lunes: lunes,
                    martes: martes,
                    miercoles: miercoles,
                    jueves: jueves,
                    viernes: viernes,
                    sabado: sabado,
                    domingo: domingo,
                    fechaInicio: fechaInicio?.format('YYYY-MM-DDTHH:mm:ss'),
                    fechaFin: fechaFin?.format('YYYY-MM-DDTHH:mm:ss'),
                    idProyecto: proyectoId,
                    idPlantilla: plantillaId,
                    idTipoNotificacion: typeNotifictionId,
                    criterios: chipData

                }),

            }).then((response) => {

                if (!response.ok) {
                    alert("Error desconocido.");
                }
                return response.json()
            })
                .then((data) => {
                    // setLoading(false);
                    if (data[0].code == 1) {
                        getEnviosData()

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

    const handleSelectPlantilla = (event: SelectChangeEvent<typeof proyecto>, key: any) => {

        const itemKey = key.key.slice(2);
        setPlantilla(event.target.value);
        setPlantillaId(plantillaData[itemKey].id_notificacion);
        setTitulo(plantillaData[itemKey].titulo)
        setDescripcion(plantillaData[itemKey].descripcion)
        setRutaImagen(plantillaData[itemKey].imagen)
        setRutaAccion(plantillaData[itemKey].action_url)

    };




    const handleSelectTypeNotification = (event: SelectChangeEvent<typeof typeNotification>, key: any) => {

        const itemKey = key.key.slice(2);
        setTypeNotification(event.target.value);
        setTypeNotificationId(itemKey);

    };



    // const handleDelete = (chipToDelete: ChipData) => () => {
    //     setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

    //     const newAvailableName: any = { id_criterio: chipToDelete.key, titulo: chipToDelete.label };

    //     setCriteriaData((criteriaData: any) => [...criteriaData, newAvailableName]);
    // };

    // const handleChipSelection = (event: SelectChangeEvent<string>, key: any) => {
    //     const label = event.target.value;
    //     const itemKey = key.key.slice(2);
    //     console.dir(itemKey)
    //     if (label) {
    //         const newChip: ChipData = { key: itemKey, label };
    //         setChipData((chips) => [...chips, newChip]);
    //         setCriteriaData((options: any) => criteriaData.filter((criteriaData: any) => criteriaData.titulo !== label));
    //     }
    // };




    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOpen}>Configurar nuevo envio</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="form-modal"
                aria-describedby="form-modal-description"
            >
                <Box
                    sx={{
                        transition: 'width 0.5s ease',
                        width: '55vw',
                        maxHeight: '90vh', borderRadius: 3, m: 'auto', marginTop: '2%'
                    }}
                >
                    <Card variant="outlined" sx={{}}>
                        <CardContent>

                            <Box style={{ maxHeight: '80vh', overflowY: 'auto', padding: '0px 40px 40px 40px', gap: '35px' }}>
                                <form onSubmit={handleSubmit}>
                                    <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Grid container >

                                            <Grid item xs={12} style={{
                                                transition: 'all 0.4s ease',
                                                overflow: 'hidden'
                                            }} >
                                                <Typography mt={2} align='center' pt={2} variant='h5' >Datos para el nuevo envio:</Typography>

                                                <Tab sx={{ minHeight: '20px', minWidth: '100%' }}
                                                    label={<div>   <Typography variant="caption">
                                                        Selecciona la plantilla y la configuración que tendra:
                                                    </Typography></div>}
                                                />

                                                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px' }} >


                                                    <FormControl fullWidth>
                                                        <InputLabel id="project-label">Aplicación para el envio: </InputLabel>

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
                                                        {proyecto == 'Campo requerido' && <FormHelperText>Por favor elige un proyecto</FormHelperText>}
                                                    </FormControl>



                                                    <FormControl fullWidth>

                                                        <InputLabel id="project-label">Plantilla: </InputLabel>

                                                        <Select
                                                            labelId='project-label'
                                                            fullWidth
                                                            value={plantilla}
                                                            onChange={handleSelectPlantilla}
                                                            label='plantilla:'
                                                        >
                                                            {plantillaData.map((plantilla: any, index: any) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={plantilla.id_notificacion + ' - ' + plantilla.titulo}
                                                                >
                                                                    {plantilla.id_notificacion + ' - ' + plantilla.titulo}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        {proyecto == 'Campo requerido' && <FormHelperText>Por favor elige un proyecto</FormHelperText>}
                                                    </FormControl>

                                                    <NotificationPreview
                                                    plantilla ={plantilla}
                                                    titulo={titulo}
                                                    descripcion={descripcion} 
                                                    previewUrl={previewUrl}
                                                    >

                                                    </NotificationPreview>


                                                    <FormControl fullWidth>
                                                        <InputLabel id="type-notification-label">Tipo de notificación: </InputLabel>

                                                        <Select
                                                            labelId='type-notification-label'
                                                            fullWidth
                                                            value={typeNotification}

                                                            label='Tipo de notificación'
                                                            onChange={handleSelectTypeNotification}
                                                        >
                                                            {typeNoficationData.map((type: any) => (
                                                                <MenuItem
                                                                    key={type.id_tipo_notificacion}
                                                                    value={type.nombre}
                                                                >
                                                                    {type.nombre}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        {typeNotification == 'Campo requerido' && <FormHelperText>Por favor elige un tipo de notificación</FormHelperText>}
                                                    </FormControl>


                                                    <Collapse in={typeNotification == 'Semanal'} timeout={500}>
                                                        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>


                                                            <InputLabel htmlFor="outlined-adornment-password">Selecciona los dias que sera enviada la notificación:</InputLabel>
                                                            <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>

                                                                <FormControlLabel
                                                                    control={<MaterialUISwitch checked={lunes} onChange={(e) => setLunes(e.target.checked)} />}
                                                                    label="Lunes"
                                                                />

                                                                <FormControlLabel
                                                                    control={<MaterialUISwitch checked={martes} onChange={(e) => setMartes(e.target.checked)} />}
                                                                    label="Martes"
                                                                />

                                                                <FormControlLabel
                                                                    control={<MaterialUISwitch checked={miercoles} onChange={(e) => setMiercoles(e.target.checked)} />}
                                                                    label="Miercoles"
                                                                />
                                                                <FormControlLabel
                                                                    control={<MaterialUISwitch checked={jueves} onChange={(e) => setJueves(e.target.checked)} />}
                                                                    label="Jueves"
                                                                />

                                                                <FormControlLabel
                                                                    control={<MaterialUISwitch checked={viernes} onChange={(e) => setViernes(e.target.checked)} />}
                                                                    label="Viernes"
                                                                />

                                                                <FormControlLabel
                                                                    control={<MaterialUISwitch checked={sabado} onChange={(e) => setSabado(e.target.checked)} />}
                                                                    label="Sabado"
                                                                />

                                                                <FormControlLabel
                                                                    control={<MaterialUISwitch checked={domingo} onChange={(e) => setDomingo(e.target.checked)} />}
                                                                    label="Domingo"
                                                                />

                                                            </Box>
                                                        </Box>
                                                    </Collapse>

{/* 
                                                    <>
                                                        <Paper
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                borderRadius: '25px',
                                                                minHeight: '20px',
                                                                maxWidth: '100%',
                                                                gap: '5px',
                                                                flexWrap: 'wrap',
                                                                listStyle: 'none',
                                                                p: 2,
                                                                m: 0,
                                                            }}
                                                            component="ul"
                                                        >
                                                            <Tab sx={{ minHeight: '20px', minWidth: '100%' }}
                                                                label={<div>   <Typography variant="caption">
                                                                    Esta notificacion se enviara a los usuarios que cumplan los siguientes criterios:
                                                                </Typography></div>}
                                                            />

                                                            <Box sx={{ width: '100%', p: 1, borderRadius: 2, backgroundColor: '#F2F2F9', minHeight: '30px', ml: 2, mr: 2 }}>
                                                                <Stack direction="column" spacing={1}>
                                                                    {chipData.length == 0 && (<Typography color={'gray'} align='center'>Sin criterios</Typography>)

                                                                    }
                                                                    {chipData.map((data) => {
                                                                        let icon;
                                                                        return (
                                                                            <Chip
                                                                                icon={icon}
                                                                                label={data.label}
                                                                                color={'success'}
                                                                                variant='filled'
                                                                                onDelete={handleDelete(data)}
                                                                                sx={{
                                                                                    '& .MuiChip-deleteIcon': {
                                                                                        color: 'white',
                                                                                    }, color: 'white', backgroundColor: 'gray'
                                                                                }}


                                                                            />
                                                                        );
                                                                    })}
                                                                </Stack>
                                                            </Box>


                                                            <InputLabel htmlFor="outlined-adornment-password">Agregar criterios para el envio de esta notificación:</InputLabel>

                                                            <FormControl sx={{ m: 1, width: '100%' }}>
                                                                <InputLabel id="demo-multiple-chip-label">Selecciona un criterio de la lista</InputLabel>
                                                                <Select
                                                                    labelId="demo-multiple-chip-label"
                                                                    id="demo-multiple-chip"
                                                                    onChange={handleChipSelection}
                                                                    input={<OutlinedInput id="select-multiple-chip" label="Selecciona un criterio de la lista" />}
                                                                    renderValue={(selected) => {
                                                                        if (selected.length === 0) {
                                                                            return <em>Selecciona un criterio.</em>;
                                                                        }

                                                                        return criteriaData.length == 0 ? 'Sin mas criterios' : 'Selecciona';
                                                                    }}
                                                                >
                                                                    {criteriaData.map((criteria: any) => (
                                                                        <MenuItem
                                                                            key={criteria.id_criterio}
                                                                            value={criteria.titulo}
                                                                            style={getStyles(criteria.titulo, personName, theme)}
                                                                        >
                                                                            {criteria.titulo}
                                                                        </MenuItem>
                                                                    ))}

                                                                </Select>
                                                            </FormControl>


                                                        </Paper>
                                                    </> */}


                                                    <TextField
                                                        disabled
                                                        label="URL DE ACCIÓN"
                                                        fullWidth
                                                        value={rutaAccion}
                                                        onChange={(e) => setRutaAccion(e.target.value)}
                                                    />

                                                    <Grid container xs={12} margin={'auto'} alignContent={'center'} alignItems={'center'}>
                                                        <Grid item xs={12} >
                                                            <InputLabel htmlFor="outlined-adornment-password">La notificacion se enviara a partir del día:</InputLabel>

                                                            <DateTimePicker
                                                                defaultValue={fechaInicio}
                                                                value={fechaInicio}
                                                                onChange={setFechaInicio}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <>
                                                                <InputLabel htmlFor="outlined-adornment-password">Hasta el dia:</InputLabel>

                                                                <DateTimePicker
                                                                    defaultValue={fechaInicio}
                                                                    value={fechaFin}
                                                                    onChange={setFechaFin}
                                                                />
                                                            </>
                                                        </Grid>


                                                    </Grid>


                                                    {/* <FormControlLabel
                                                        control={<Switch sx={{ m: 1 }} color="secondary" checked={recurrente} onChange={handleChange} />}
                                                        label={recurrente ? 'La notificación se enviara de forma recurrente.' : 'La notificación se enviara una unica vez'}

                                                    /> */}

                                                </Box>

                                            </Grid>

                                            <Grid item xs={0} style={{
                                                transition: 'all 0.6s ease',
                                                overflow: 'hidden',
                                            }}>

                                                <Collapse in={false} timeout={500}>
                                                    <Box style={{
                                                        display: 'flex', flexDirection: 'column',
                                                        justifyContent: 'center', alignItems: 'center', paddingLeft: '45px'
                                                    }} >

                                                        <Typography mt={5} variant='h6' >Configurar el primer envio de la notificación:</Typography>

                                                        <Tab sx={{ minHeight: '20px', minWidth: '100%' }}
                                                            label={<div>   <Typography variant="caption">
                                                                Esta notificacion se enviara recurrentemente de la siguiente forma:
                                                            </Typography></div>}
                                                        />

                                                        <Box style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            width: '100%'
                                                        }}>

                                                            {/* <FormControl sx={{ m: 1, width: '100%' }}>
                                                                <InputLabel id="concurrence-label">Frecuencia de envio:  </InputLabel>
                                                                <Select
                                                                    labelId="concurrence-label"
                                                                    fullWidth

                                                                    value={intervalo}
                                                                    onChange={handleSelectIntervalo}
                                                                    label="Frecuencia de envio"
                                                                >
                                                                    {intervalos.map((intervalo: any) => (
                                                                        <MenuItem
                                                                            key={intervalo.key}
                                                                            value={intervalo.intervalo}
                                                                        >
                                                                            {intervalo.intervalo}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl> */}




                                                        </Box>
                                                    </Box>
                                                </Collapse>

                                            </Grid>
                                        </Grid>

                                        <Button type="submit" variant="contained" color="primary" >{!openEditModal ? 'Crear envío' : 'Actualizar envío'}</Button>
                                    </Box>

                                </form>

                            </Box>
                        </CardContent>
                    </Card>
                </Box>

            </Modal>
        </div>
    );
};

