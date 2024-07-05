// App.js
import { useState, useEffect, ReactNode } from 'react';
import {  Routes, Route, Navigate, useLocation, useNavigate, HashRouter } from 'react-router-dom';
import Login from './components/login/login';
import './App.css'
import { LandingPageLayout } from './components/landing-page/landingPageLayout';
import { PortfolioHome } from './components/landing-page/portfolio-home/portfolioHome';
import { PortfolioCV } from './components/landing-page/portfolio-cv/portfolioCV';


interface RememberLastVisitedPathProps {
  children: ReactNode;
  isLoggedIn: any;
}
// Componente para manejar la lógica de recordar la última URL visitada
const RememberLastVisitedPath: React.FC<RememberLastVisitedPathProps> = ({ children, isLoggedIn }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      localStorage.setItem('lastVisitedPath', location.pathname + location.search);
    }
  }, [location]);

  const navigate = useNavigate();

  useEffect(() => {

    // Al cargar la aplicación, redirigir a la URL guardada si existe
    const lastVisitedPath = localStorage.getItem('lastVisitedPath');
    if (isLoggedIn && lastVisitedPath && lastVisitedPath !== '/') {
      navigate(lastVisitedPath);
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export function App() {
  const [sharedTitle, setSharedTitle] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('user');
    return turnFromStorage ? true : true;
  });



  return (
    <div className='Home'>
      {/* <Router basename={import.meta.env.BASE_URL}> */}
      <HashRouter>

      
        <RememberLastVisitedPath isLoggedIn={isLoggedIn}>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/landingPage/portfolioHome/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/landingPage/" element={isLoggedIn ? <LandingPageLayout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setSharedTitle={setSharedTitle} sharedTitle={sharedTitle} /> : <Navigate to="/" />} >
              <Route index path="portfolioHome" element={<PortfolioHome />} />
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
        </RememberLastVisitedPath>
        </HashRouter>
      {/* </Router> */}
    </div>
  );
}