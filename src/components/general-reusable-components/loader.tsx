// Loader.js
import { Stack, Typography } from '@mui/material';
import './loader.css';
import CyberpunkTypography from '../../utils/cyberpunkTypography';
import CyberpunkSecondaryTypography from '../../utils/cyberpunkSecondaryTypography';
const Loader = () => (
    <div className="loader">
        <Stack spacing={3} >
            <div className="square-container">
                {Array(9).fill(0).map((_, index) => (
                    <div key={index} className="square"></div>
                ))}
            </div>
            
                      <CyberpunkSecondaryTypography>LOADING...</CyberpunkSecondaryTypography>

            <CyberpunkTypography>_'⌛︎-</CyberpunkTypography>
        </Stack>


    </div>
);

export default Loader;