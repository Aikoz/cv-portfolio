import { Card, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CyberpunkTypography from './cyberpunkTypography';


const PreviewCard = ({ title, mediaType, mediaSrc, dlink }: any) => {
    return (
        <Card sx={{
            width: '100%', margin: '1rem', borderRadius: '15px', transition: 'transform 0.15s ease-in-out',
            '&:hover': {
                transform: 'scale3d(1.05, 1.05, 1)',
            }
        }}>
            <Link to={dlink}
                target="_blank"
                color='lightgray'
            >
                <Box>
                    {mediaType === 'image' && (
                        <CardMedia
                            component="img"
                            height="540"
                            image={mediaSrc}
                            alt={title}
                            style={{ width: '100%', 
                                objectFit: 'cover',
                                backgroundColor:'black',
                                pointerEvents: 'none' }}
                        />
                    )}
                    {mediaType === 'video' && (
                        <CardMedia
                            component="video"
                            height="540"
                            //controls
                            autoPlay
                            muted
                            loop
                            style={{ width: '100%', 
                                objectFit: 'cover',
                                backgroundColor:'black',
                                pointerEvents: 'none' }}
                        >
                            <source src={mediaSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </CardMedia>
                    )}
                    {mediaType === 'youtube' && (
                        <CardMedia
                            component="iframe"
                            height="540"
                            src={mediaSrc}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{
                                width: '100%', 
                                objectFit: 'cover',
                                backgroundColor:'black',
                                pointerEvents: 'none'
                            }}
                        />
                    )}
                </Box>
            </Link>
            <Box sx={{
                marginTop: '-150px',
                height: '95px',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                backgroundColor: 'rgba(9, 9, 9, 0.65)',
                //backgroundColor: 'rgba(9, 9, 9, 0.65)',
                border: '1px solid rgba(36, 28, 28, 0.125)',
                color: '#ffffffdd',
                flex: '1 1 auto',
                padding: '1rem',
                fontSize: '1.15em',
                lineHeight: '1.5em',
                //borderRadius: '0.5rem',

            }}>
                <Typography

                    sx={{
                        fontFamily: 'Libre Franklin, Arial, sans-serif',
                        fontWeight: '400',
                        fontSize: '35px',
                        width: '100%',
                        marginBottom:'-25px'
                        // backgroundColor:'green',
                        // textAlign: 'center'
                    }}
                >
                    {title}
                </Typography>

                <CyberpunkTypography text='-._.'>

                </CyberpunkTypography>
            </Box>


        </Card>
    );
};

export default PreviewCard;