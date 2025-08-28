// App.js
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import {  BrowserRouter as Router } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Login from './components/login/login';
import './App.css'
import { LandingPageLayout } from './components/landing-page/landingPageLayout';
import { PortfolioHome } from './components/landing-page/portfolio-home/portfolioHome';
import { PortfolioCV } from './components/landing-page/portfolio-cv/portfolioCV';
import { Box } from '@mui/material';
import { PortfolioReadings } from './components/landing-page/portfolio-readings/portfolioReadings';
import { PortfolioProjects } from './components/landing-page/portfolio-projects/portfolioProjects';
import { PortfolioContact } from './components/landing-page/portfolio-contact/portfolioContact';
import Loader from './components/general-reusable-components/loader';
import ReactGA from 'react-ga';


// Componente para manejar la lógica de recordar la última URL visitada




export function App() {
  // const open = true; // o false, dependiendo de tu lógica
  // const drawerWidth = '240px'; // ejemplo, ajusta según tu diseño

  const [sharedTitle, setSharedTitle] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('user');
    return turnFromStorage ? true : true;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
       setLoading(true); // Activa el loader cuando cambia la ruta
        ReactGA.pageview(window.location.pathname + window.location.search);
    const timeout = setTimeout(() => {
      setLoading(false); // Detenemos el loader después de un retraso de 1 segundo (ajustable)
    }, 2500); // 1000ms = 1 segundo
  
    return () => clearTimeout(timeout);

  }, []);



  return (
    <Box >
      {/* <Router basename={import.meta.env.BASE_URL}> */}
      <HashRouter>
        {loading && <Loader />}
        <div className={`app-content ${loading ? 'hidden' : ''}`}>
          <Routes>

            <Route path="/" element={isLoggedIn ? <Navigate to="/landingPage/portfolioHome/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/landingPage/" element={isLoggedIn ? <LandingPageLayout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setSharedTitle={setSharedTitle} sharedTitle={sharedTitle} setLoading={setLoading} /> : <Navigate to="/" />} >
              <Route index path="portfolioHome" element={<PortfolioHome />} />
              <Route index path="portfolioProjects" element={<PortfolioProjects />} />
              <Route index path="portfolioReadings" element={<PortfolioReadings />} />
              <Route index path="portfolioContact" element={<PortfolioContact />} />
              <Route index path="resume" element={<PortfolioCV />} />


            </Route>

            <Route
              path="*"
              element={
                <main style={{ padding: '1rem', color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '200px' }}>
                  <h1>404: Ruta no encontrada!</h1>
                </main>
              }
            />
          </Routes>
        </div>
      </HashRouter>
      {/* </Router> */}
    </Box>
  );
}