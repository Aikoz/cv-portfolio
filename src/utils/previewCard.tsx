import { Card, CardMedia, Box } from '@mui/material';
import CyberpunkTypography from './cyberpunkTypography';


const PreviewCard = ({ title, mediaType, mediaSrc }: any) => {
    return (
        <Card sx={{
            width: '100%',
            maxHeight: '100%',
            borderRadius: '15px',
            backgroundColor: 'rgb(6,6,6,0.4)',

            transition: 'transform 0.15s ease-in-out',
            '&:hover': {
                transform: 'scale3d(1.05, 1.05, 1)',
            }
        }}>
            <Box sx={{ height: '100%', backgroundColor: 'rbg(6,6,6,0.4)' }}>
                {mediaType === 'image' && (
                    <CardMedia
                        component="img"
                        image={mediaSrc}
                        alt={title}
                        loading='lazy'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '15px',
                            backgroundColor: 'black',
                            pointerEvents: 'none'
                        }}
                    />
                )}
                {mediaType === 'video' && (
                    <CardMedia
                        component="video"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            backgroundColor: 'black',
                            borderRadius: '15px',
                            pointerEvents: 'none'
                        }}
                        autoPlay
                        muted
                        loop
                    >
                        <source src={mediaSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </CardMedia>
                )}
                {mediaType === 'youtube' && (
                    <CardMedia
                        component="iframe"
                        src={mediaSrc}
                        title={title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '15px',
                            backgroundColor: 'black',
                            pointerEvents: 'none'
                        }}
                    />
                )}
                <Box sx={{
                    marginTop: '-2.15em',
                    height: '2.15em',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    backgroundColor: 'rgba(9,9, 9, 0.7)',
                    border: '1px solid rgba(36, 28, 28, 0.125)',
                    color: '#ffffffdd',
                    overflow: 'hidden'
                    //borderRadius: '0.5rem',

                }}>

                    <Box sx={{
                    marginTop: '-1em', marginLeft:'2em'}}>
                        <CyberpunkTypography text='-._.' >

                        </CyberpunkTypography>
                    </Box>

                </Box>
            </Box>





        </Card>
    );
};

export default PreviewCard;