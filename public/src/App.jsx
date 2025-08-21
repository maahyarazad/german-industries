
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { useEffect, useRef } from "react";
import LandingPage from './pages/LandingPage';
import VideoPage from './pages/VideoPage';


const RouteLoader = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      NProgress.start();
    }

    // Let the DOM update before stopping
    requestAnimationFrame(() => {
      NProgress.done();
      prevPathRef.current = location.pathname;
    });
  }, [location]);

  return null;
};

function AppRoutes() {
  return (
    <>
      <RouteLoader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/videos" element={<VideoPage />} />
        
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

