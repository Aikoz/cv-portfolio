import { Box, Card, CardContent, CardMedia, Collapse, Stack, Typography } from "@mui/material"
import { useEffect } from "react"

export function NotificationPreview(props: any) {
    const { plantilla, titulo, descripcion, previewUrl } = props

    useEffect(() => {

    }, [])

    return (
        <>
            <Collapse in={plantilla != ''} timeout={500} sx={{ width: '100%' }}>



                <Card sx={{ backgroundColor: 'white', color: 'black', maxHeight: '250px', borderRadius: 3 }}>

                    <Stack direction="row"
                        sx={{
                            transition: 'all 0.5s ease',
                            width: '100%'
                        }}>


                        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth:'85%'}}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5" >
                                    {titulo}
                                </Typography>
                                <Typography variant="subtitle1" component="div">
                                    {descripcion}
                                </Typography>
                            </CardContent>

                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black', minWidth:'15%' }}>

                            <CardMedia
                                component="img"
                                sx={{ margin: 'auto', minWidth: 125, maxHeight: '100%', backgroundColor: 'black' }}
                                image={`${previewUrl}`}
                                alt="Ruta de imagen invalida"

                            />
                        </Box>

                    </Stack>
                </Card>

            </Collapse></>
    )
}