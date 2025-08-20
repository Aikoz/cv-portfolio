import { FormEvent, useState } from 'react';
import { Box, Button, Card, Modal, TextField, Typography } from '@mui/material';
// import { FormatAlignJustify } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
import { server } from '../../../utils/constants';

export const NuevoProyecto = ({getProjectData}:any) => {


    const [open, setOpen] = useState(false);
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ruta, setRuta] = useState('');


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch(server.dev_url +'/projects/create_project', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombreProyecto, descripcion: descripcion, tipo_proyecto: 1, ruta: ruta }),

        }).then((response) => {

            if (!response.ok) {
                alert("Error desconocido.");
            }
            return response.json()
        })
            .then((data) => {
                if (data[0].code) {
                    getProjectData()
                } else {
                    alert(data[0].message);

                }

            });
            console.dir(response)

        handleClose();
    };

    return (
        <div>
            <Button variant="contained" style={{backgroundColor:'black', color: 'white'}} onClick={handleOpen}>Crear nuevo proyecto</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="form-modal"
                aria-describedby="form-modal-description"
            >
                <Card variant="outlined" sx={{ maxWidth: '50vw', height: '50vh', borderRadius: 3, m: 'auto', marginTop: '10%'}} >

                    <Box style={{ height: '40vh', overflowY: 'auto' , padding: '20px'}}>                            

                    <form onSubmit={handleSubmit}>
                        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                            <Typography m={2} variant='h5' >Datos para el nuevo proyecto:</Typography>
                            <TextField
                                required
                                label="Nombre de proyecto"
                                fullWidth
                                onChange={(e) => setNombreProyecto(e.target.value)}
                                helperText="Nombre para el nuevo proyecto"
                            />
                            <TextField
                                required
                                label="Ruta"
                                fullWidth
                                onChange={(e) => setRuta(e.target.value)}
                                helperText="Ruta para el back"
                            />
                            <TextField
                                helperText="Describe que tipo de aplicación es"
                                required
                                label="Descripción"
                                multiline
                                rows={3}
                                fullWidth
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" >Crear</Button>
                        </Box>

                    </form>

                    </Box>

                </Card>
            </Modal>
        </div>
    );
};

