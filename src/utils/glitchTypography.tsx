/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Typography } from '@mui/material';

const glitch = keyframes`
  0% { transform: translate(-10px); }
  // 20% { transform: translate(-2px, 0px); }
  50% { transform: translate(10px, 0px); }
  // 60% { transform: translate(-2px, 0px); }
  // 80% { transform: translate(20px, 0px); }
  100% { transform: translate(-10px); }
`;

const glitchStyles = css`
  position: relative;
  color: white;
  font-size: 1.1em;
  font-weight: 100;
  font-family: 'Libre Franklin', Arial, sans-serif;
  text-decoration: underline;
  animation: ${glitch} 2s infinite;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    color: white;
    background: black;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
  }

  &::before {
    animation: ${glitch} 0.5s infinite;
    color: red;
  }

  &::after {
    animation: ${glitch} 1.5s infinite;
    color: blue;
    clip: rect(0, 900px, 0, 0);
  }
`;

function GlitchTypography(props:any) {
  const {text}=props
  return (
    
    <Typography css={glitchStyles} data-text="Glitch Effect">
      {text}
    </Typography>
  
);
}

export default GlitchTypography;