// Loader.js
import { Stack, Typography } from '@mui/material';
import './loader.css';
import GlitchTypography from '../../utils/glitchTypography';

const Loader = () => (
    <div className="loader">
        <Stack spacing={3}>
            <div className="square-container">
                {Array(9).fill(0).map((_, index) => (
                    <div key={index} className="square"></div>
                ))}
            </div>
            <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              width:'100%',
              fontSize: '25px',
              color: 'lightgray'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Loading...
          </Typography>
            <GlitchTypography text='________________-'></GlitchTypography>
        </Stack>


    </div>
);

export default Loader;