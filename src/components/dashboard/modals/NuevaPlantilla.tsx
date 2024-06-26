import React, { FormEvent, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Collapse, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, ListItem, MenuItem, Modal, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, Switch, Tab, TextField, Theme, Typography, colors, styled, useTheme } from '@mui/material';
import { FormatAlignJustify, InsertEmoticon, Padding, WidthFull } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import NotificationsIcon from '../../../assets/alarm.png';
import NotificationsSlashIcon from '../../../assets/mute.png';
import { server } from '../../../utils/constants'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ListData } from '../components/reusable-components/ListaData';
import { NotificationPreview } from '../components/reusable-components/NotificationPreview';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz('America/Mexico_City');

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface ChipData {
    key: number;
    label: string;
}
interface DataList {
    id_criterio: number;
    id_dato_criterio: number;
    parametro: string;
    prioridad: number;
    titulo: string;
    code: string;
    selected_status: number;
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const NuevaPlantilla = (props: any) => {


    const { getNotificationData, projectData, notificationsData, editIndex, openEditModal, setOpenEditModal, criteriaData, typeNoficationData } = props;

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
    const [typeNotification, setTypeNotification] = useState('');
    const [typeNotifictionId, setTypeNotificationId] = useState(0);
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    //handlers para archivo
    const [file, setFile] = useState<File | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [chipData, setChipData] = useState<ChipData[]>([]);
    const [dataListBase, setDataListBase] = useState<DataList[]>([]);
    const [pickerDataList, setPickerDataList] = useState<DataList[]>([]);
    const [uploadStatus, setUploadStatus] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        setPickerDataList(criteriaData)
        if (openEditModal) {

            setTitulo(notificationsData[editIndex].titulo)
            setDescripcion(notificationsData[editIndex].descripcion)
            setRutaImagen(notificationsData[editIndex].imagen)
            setRutaAccion(notificationsData[editIndex].action_url)
            let tipoNotif = notificationsData[editIndex].id_tipo_notificacion;
            setImage(notificationsData[editIndex].imagen)
            handleOpen()

        }
        else {

            setTitulo('')
            setDescripcion('')
            setRutaImagen('')
            setRutaAccion('')
            setLunes(false)
            setMartes(false)
            setMiercoles(false)
            setJueves(false)
            setViernes(false)
            setSabado(false)
            setDomingo(false)

        }
    }, [openEditModal, editIndex, open])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpenEditModal(false);
        setOpen(false);
    }


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (openEditModal) {
            const response = await fetch(server.dev_url + '/notifications/update_notificacion', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: formData,
                body: JSON.stringify({
                    idNotificacion: notificationsData[editIndex].id_notificacion,
                    titulo: titulo,
                    descripcion: descripcion,
                    rutaImagen: rutaImagen,
                    rutaAccion: rutaAccion,
                    image: null,
                    fechaInicio: fechaInicio?.format('YYYY-MM-DDTHH:mm:ss'),
                    fechaFin: fechaFin?.format('YYYY-MM-DDTHH:mm:ss'),
                    idProyecto: proyectoId,
                    idTipoNotificacion: typeNotifictionId
                }),

            }).then((response) => {

                if (!response.ok) {
                    alert("Error desconocido.");
                }
                return response.json()
            })
                .then((data) => {
                    setLoading(false);
                    if (data[0].code == 1) {
                        getNotificationData()

                    } else {

                        alert(data[0].message);

                    }
                });

            handleClose();

        } else {


            // if (!selectedFile) {
            //     alert('Por favor, selecciona una imagen primero.');
            //     return;
            //   }

            if (proyecto == '' || proyecto == 'Campo requerido') {
                setProyecto('Campo requerido')
                alert('Selecciona un proyecto para continuar')
                return
            }
            if (typeNotification == '' || typeNotification == 'Campo requerido') {
                setTypeNotification('Campo requerido')
                alert('Selecciona un proyecto para continuar')
                return
            }


            // const formData = new FormData();
            // formData.append('titulo', titulo);
            // formData.append('descripcion', descripcion);
            // formData.append('rutaImagen', rutaImagen);
            // // formData.append('image', selectedFile);
            // formData.append('image', null);
            // formData.append('rutaAccion', rutaAccion);
            // formData.append('lunes', lunes);
            // formData.append('martes', martes);
            // formData.append('miercoles', miercoles);
            // formData.append('jueves', jueves);
            // formData.append('viernes', viernes);
            // formData.append('sabado', sabado);
            // formData.append('domingo', domingo);
            // formData.append('fechaInicio', fechaInicio?.format('YYYY-MM-DDTHH:mm:ss'));
            // formData.append('fechaFin', fechaFin?.format('YYYY-MM-DDTHH:mm:ss'));
            // formData.append('idProyecto', proyectoId);
            // formData.append('idTipoNotificacion', typeNotifictionId);
            // formData.append('criterios', chipData);

            const response = await fetch(server.dev_url + '/notifications/create_notifications', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: titulo,
                    descripcion: descripcion,
                    rutaImagen: rutaImagen,
                    image: selectedFile,
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
                    setLoading(false);
                    if (data[0].code == 1) {
                        getNotificationData()

                    } else {

                        alert(data[0].message);

                    }
                });

            handleClose();

        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    };
    const handleSelectProyecto = (event: SelectChangeEvent<typeof proyecto>, key: any) => {

        const itemKey = key.key.slice(2);
        setProyecto(event.target.value);
        setProyectoId(itemKey);

    };

    const handleSelectTypeNotification = (event: SelectChangeEvent<typeof typeNotification>, key: any) => {

        const itemKey = key.key.slice(2);
        setTypeNotification(event.target.value);
        setTypeNotificationId(itemKey);

    };

    const handleSelectIntervalo = (event: SelectChangeEvent<typeof proyecto>, key: any) => {

        const itemKey = key.key;

    };




    const handleDelete = (chipToDelete: ChipData) => () => {


        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

        const newAvailableName: any = { id_criterio: chipToDelete.key, titulo: chipToDelete.label };

        setPickerDataList((pickerDataList: any) => [...pickerDataList, newAvailableName]);

    };

    useEffect(() => {

        setDataListBase([])

        chipData.forEach(chip => {
            let itemKey = chip.key
            criteriaData.forEach(criteriaRow => {

                if (criteriaRow.id_criterio == itemKey) {
                    if (criteriaRow.listaDatos) {
                        criteriaRow.listaDatos.forEach(dataRow => {

                            let newDataRow: DataList = {
                                id_criterio: dataRow.id_criterio,
                                id_dato_criterio: dataRow.id_dato_criterio,
                                parametro: dataRow.parametro,
                                prioridad: dataRow.prioridad,
                                titulo: dataRow.titulo,
                                code: '&%' + dataRow.id_criterio + dataRow.id_dato_criterio,
                                selected_status: 0
                            };

                            setDataListBase((existentList) => [...existentList, newDataRow]);

                        });


                    }


                }
            });

        });


    }, [chipData])


    const updateDataListValue = (id, newValue) => {


        setDataListBase(prevBase => {
            return prevBase.map((item, index) => {
                if (item.code === id) {
                    // Actualiza el selected_status de la pregunta anterior si se encuentra el patrón
                    return { ...prevBase[index], selected_status: newValue }

                } else {
                    // Actualiza el valor de la pregunta actual sin cambios adicionales
                    return item;
                }
            });
        });
    };

    useEffect(() => {

        dataListBase.forEach(dataListRow => {

            updateDataListValue(dataListRow.code, 0)
            // console.dir(dataListRow.code);
            // console.dir(descripcion.search(dataListRow.code));
            if (descripcion.search(dataListRow.code) != -1) {
                // console.dir('encontrado:')
                // console.dir(dataListRow.code)
                updateDataListValue(dataListRow.code, 1)
            }

        });


    }, [descripcion])

    useEffect(() => {

        console.dir(dataListBase)


    }, [dataListBase])

    function templateDynamicFormatter (text: string, dataListArray: DataList[] ) {
    
        
        let resultText = text
    
            dataListArray.forEach(dataListRow => {

                const regex = new RegExp(dataListRow.code, 'gi');
                resultText.replace(regex,'{'+dataListRow.titulo+'}')
                console.dir(resultText)

            });
            
    
    
        return resultText
     
     }

    const handleChipSelection = (event: SelectChangeEvent<string>, key: any) => {

        const label = event.target.value;
        const itemKey = key.key.slice(2);
        if (label) {
            const newChip: ChipData = { key: itemKey, label };
            setChipData((chips) => [...chips, newChip]);
            setPickerDataList((option: any) => pickerDataList.filter((pickerDataList: any) => pickerDataList.titulo !== label));
        }
    };

    //loader_____________________________________________


    const handleFileChange = (event) => {

        const file = event.target.files[0];
        setSelectedFile(file);


        // Crear una URL de vista previa para la imagen seleccionada
        const reader = new FileReader();
        reader.onloadend = () => {

            if (typeof reader.result === 'string') {
                setPreviewUrl(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };


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
            const dataURL = event.target.result;
            console.log('DataURL:', dataURL);
            setPreviewUrl(dataURL)
        };

        // Leer el contenido del archivo como URL de datos
        fileReader.readAsDataURL(file);

    };

    return (
        <div>

            <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOpen}>Crear nueva plantilla</Button>

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
                        //width: '75vw',
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
                                                <Typography mt={2} align='center' pt={2} variant='h5' >Datos de la plantilla de notificación:</Typography>

                                                <Tab sx={{ minHeight: '20px', minWidth: '100%' }}
                                                    label={<div>   <Typography variant="caption">
                                                        Llena los datos para la notificación:
                                                    </Typography></div>}
                                                />

                                                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px' }} >


                                                    <TextField
                                                        required
                                                        label="Titulo"
                                                        fullWidth
                                                        value={titulo}
                                                        onChange={(e) => setTitulo(e.target.value)}
                                                        helperText="Titulo que el usuario podra ver en la notificación"
                                                    />

                                                    <Stack direction="row" spacing={dataListBase.length == 0 ? 0 : 2} sx={{
                                                        transition: 'all 0.5s ease',
                                                        width: '100%'
                                                    }}>
                                                        <Box sx={{
                                                            transition: 'width 0.5s ease',
                                                            width: dataListBase.length == 0 ? '100%' : '50%',
                                                            display: 'flex', 
                                                            flexDirection: 'column', 
                                                            justifyContent: 'center', 
                                                            alignItems: 'center',
                                                            gap: '15px'
                                                        }}>
                                                            <TextField
                                                                required
                                                                label="Descripción"
                                                                fullWidth
                                                                value={descripcion}
                                                                multiline
                                                                rows={5}
                                                                onChange={(e) => setDescripcion(e.target.value)}
                                                                
                                                            />
                                                            <NotificationPreview
                                                                plantilla={descripcion}
                                                                titulo={titulo}
                                                                descripcion={templateDynamicFormatter(descripcion, dataListBase )}
                                                                previewUrl={previewUrl}

                                                            >

                                                            </NotificationPreview>
                                                        </Box>

                                                        <ListData listData={dataListBase}></ListData>
                                                    </Stack>

                                                    {!openEditModal &&

                                                        <>
                                                            <Paper
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    borderRadius: '25px',
                                                                    border: '0.5px solid',
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

                                                                <Box sx={{
                                                                    width: '100%',
                                                                    p: 1,
                                                                    borderRadius: 2,
                                                                    backgroundColor: '#F2F2F9',
                                                                    minHeight: '20px',
                                                                    ml: 2,
                                                                    mr: 2
                                                                }}>
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

                                                                            return pickerDataList.length == 0 ? 'Sin mas criterios' : 'Selecciona';
                                                                        }}
                                                                    >
                                                                        {pickerDataList.map((criteria: any) => (
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
                                                        </>
                                                    }



                                                    {/* <Grid container direction={'column'} >
                                                        <Grid item xs={8

                                                        }>
                                                            <Container>
                                                                <Typography variant="h5" gutterBottom>
                                                                    Cargar Imagen
                                                                </Typography>
                                                                <TextField
                                                                    type="file"
                                                                    fullWidth
                                                                    onChange={handleFileChange}
                                                                    inputProps={{ accept: 'image/*' }}
                                                                />
                                                                
                                                                <Typography variant="body1" style={{ marginTop: '20px' }}>
                                                                    {uploadStatus}
                                                                </Typography>
                                                            </Container>

                                                        </Grid>
                                                        <Grid item xs={4} >
                                                            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px', backgroundColor: 'black', borderRadius: '15px', padding: '15px' }}>
                                                                <img
                                                                    src={previewUrl}
                                                                    alt="Vista previa"
                                                                    style={{ maxHeight: '150px', width: 'auto' }}
                                                                />
                                                            </Box>

                                                        </Grid>

                                                    </Grid> */}


                                                    {/* <Grid container spacing={2}>
                                                        <Grid item xs={9}>
                                                            <TextField
                                                                helperText="Ruta para la imagen de la notificación"
                                                                required
                                                                label="URL de imagen"
                                                                fullWidth
                                                                value={rutaImagen}

                                                                onChange={(e) => setRutaImagen(e.target.value)}
                                                            />

                                                        </Grid>
                                                        <Grid item xs={3} >
                                                            <img src={`data:image/png;base64,${previewUrl}`}
                                                                alt="Ingresa URL de imagen valida"
                                                                loading="lazy"
                                                                style={{
                                                                    maxWidth: '100%',
                                                                    margin: 'auto',
                                                                    padding: 'auto',
                                                                    height: 'auto',
                                                                    borderRadius: '10px',
                                                                    borderColor: 'white',
                                                                }} />

                                                        </Grid>

                                                    </Grid> */}

                                                    <TextField
                                                        required
                                                        label="URL DE ACCIÓN"
                                                        fullWidth
                                                        value={rutaAccion}
                                                        onChange={(e) => setRutaAccion(e.target.value)}
                                                        helperText="Ruta para la accion de la notificación"
                                                    />
                                                    {!openEditModal &&
                                                        <FormControl fullWidth>
                                                            <InputLabel id="project-label">Aplicación para el{typeNotification == 'Semanal' ? ' primer' : ''} envio: </InputLabel>

                                                            <Select
                                                                labelId='project-label'
                                                                fullWidth
                                                                value={proyecto}

                                                                label={typeNotification == 'Semanal' ? 'Aplicación para el primer envio:' : 'Aplicación para el envio:'}
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

                                                    }

                                                    {!openEditModal &&
                                                        <>
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
                                                        </>
                                                    }


                                                    {!openEditModal &&

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
                                                                {!openEditModal &&
                                                                    <>
                                                                        <InputLabel htmlFor="outlined-adornment-password">Hasta el dia:</InputLabel>

                                                                        <DateTimePicker
                                                                            defaultValue={fechaInicio}
                                                                            value={fechaFin}
                                                                            onChange={setFechaFin}
                                                                        />
                                                                    </>}
                                                            </Grid>


                                                        </Grid>
                                                    }


                                                    {/* {!openEditModal &&
                                                        <FormControlLabel
                                                            control={<Switch sx={{ m: 1 }} color="secondary" checked={recurrente} onChange={handleChange} />}
                                                            label={recurrente ? 'La notificación se enviara de forma recurrente.' : 'La notificación se enviara una Semanal vez'}

                                                        />
                                                    } */}

                                                </Box>

                                            </Grid>

                                        </Grid>
                                        <Box mt={5}>
                                            <Button type="submit" variant="contained" color="primary" >{!openEditModal ? 'Crear plantilla' : 'Actualizar plantilla'}</Button>
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

