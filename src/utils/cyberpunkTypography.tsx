// import React from 'react';
import styled, { keyframes } from 'styled-components';
// import '@fontsource/libre-franklin'; // Importar la fuente Libre Franklin

// Definir las animaciones de glitch
const glitchAnimation = keyframes`
  0% {
    transform: translate(0);
    opacity: 1;
  }
  10% {
    transform: translate(-1px, -0px) skew(-1deg);
    opacity: 0.8;
  }
  20% {
    transform: translate(1px, 0px)  ;
    opacity: 1;
  }
  38% {
    transform: translate(-1px, 0px) ;
    opacity: 0.6;
  }
  47% {
    transform: translate(-1px, 1px) ;
 letter-spacing: 0px;
    opacity: 0.6;
  }
  48% {
    transform: translate(200px, 0px) ;
      letter-spacing: 0px;

    opacity: 0.6;
  }
  49% {
    transform: translate(-323px, -0px) ;
       letter-spacing: 0px;


    opacity: 0.9;
  }
  50% {
    transform: translate(0);
    opacity: 1;
  }
  60% {
    transform: translate(-1px, 0px) ;
    opacity: 0.8;
  }
  70% {
    transform: translate(1px, -0px) skew(1deg) ;
    opacity: 0.6;
  }
  79% {
    transform: translate(3px, -0px) ;
    opacity: 0.9;
  }
  80% {
    transform: translate(-1px, -0px) ;
    opacity: 0.9;
  }
  98% {
    transform: translate(-1px, -0px) ;
    opacity: 0.9;
  }
  99% {
    transform: translate(-3px, 0px) ;
    opacity: 0.8;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
`;

// Definir los colores que se usarán en el glitch
const colors = ['lightgray', 'cyan', 'red', 'black'];

// Definir el componente para el texto completo con animación glitch
const GlitchText = styled.div`
  font-family: 'Libre Franklin', Arial, sans-serif;
  font-weight: 300;
  font-size: 55px;
  color: ${colors[0]};
  
  animation: ${glitchAnimation} 3s infinite;
  text-shadow: 
    -1px 0 ${colors[1]}, 
    1px 0 ${colors[2]}, 
    0 1px ${colors[3]}, 
    0 -1px ${colors[0]}, 
    -3px 3px 0 ${colors[1]}, 
    3px 3px 0 ${colors[2]}, 
    3px -3px 0 ${colors[3]}, 
    -3px -3px 0 ${colors[0]};

  &::before, &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    overflow: hidden;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 ${colors[1]};
    clip: rect(24px, 550px, 90px, 0);
    animation: ${glitchAnimation} 2s infinite;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 ${colors[2]};
    clip: rect(85px, 550px, 140px, 0);
    animation: ${glitchAnimation} 1s infinite;
  }

    @media (max-width: 768px) {
    font-weight: 100;
    font-size: 25px; /* Tamaño de fuente más pequeño para pantallas móviles */
  }
`;

// Componente principal que usa GlitchText

const CyberpunkTypography = ({ children }:any) => {
  return (
    <GlitchText data-text={children}>{children}</GlitchText>
  );
};

export default CyberpunkTypography;