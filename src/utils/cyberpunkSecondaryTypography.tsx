// import React from 'react';
import styled, { keyframes } from 'styled-components';
// import '@fontsource/libre-franklin'; // Importar la fuente Libre Franklin

// Definir las animaciones de glitch
const glitchAnimationSoft = keyframes`
  0% {
    transform: translate(0);
    opacity: 1;
  }


  50% {
    transform: translate(0);
    opacity: 1;
  }
  60% {
    transform: translate(0px, 0px) ;
    opacity: 0.8;
  }
  70% {
    transform: translate(1px, 0px)  ;
    opacity: 1;
  }
  79% {
    transform: translate(3px, 0px) ;
    opacity: 0.9;
  }
  80% {
    transform: translate(-1px, 0px) ;
    opacity: 0.9;
  }
  98% {
    transform: translate(-1px, 0px) ;
    opacity: 0.9;
  }
  99% {
    transform: translate(10px, 0px) ;
    opacity: 0.8;
  }
  100% {
    transform: translate(0);
    opacity: 1; 

  }
`;

// Definir los colores que se usarán en el glitch
const colors = ['white', 'darkred', 'lightgreen', 'black'];

// Definir el componente para el texto completo con animación glitch
const GlitchText = styled.div`
  font-family: 'Libre Franklin', Arial, sans-serif;
  font-weight: 600;

  margin-top: 15px;
  margin-bottom: 15px;
  color: ${colors[0]};
  letter-spacing: 1px;

  
  animation: ${glitchAnimationSoft} 3s infinite;
  text-shadow: 
    -1px 0 ${colors[1]}, 
    1px 0 ${colors[2]}, 
    0 1px ${colors[3]}, 
    -3px 3px 0 ${colors[1]}, 
    3px 3px 0 ${colors[2]}, 
    3px -3px 0 ${colors[3]};

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
    animation: ${glitchAnimationSoft} 2s infinite;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 ${colors[2]};
    clip: rect(85px, 550px, 140px, 0);
    animation: ${glitchAnimationSoft} 1s infinite;
  }
`;

// Componente principal que usa GlitchText
const CyberpunkSecondaryTypography = ({ text }: any) => {
  return (
    <GlitchText data-text={text}>{text}</GlitchText>
  );
};

export default CyberpunkSecondaryTypography;