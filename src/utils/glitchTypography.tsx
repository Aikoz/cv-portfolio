/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Typography } from '@mui/material';

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, -2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, 2px); }
  80% { transform: translate(2px, 2px); }
  100% { transform: translate(0); }
`;

const glitchStyles = css`
  position: relative;
  color: white;
  font-size: 3em;
  font-weight: 600;
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