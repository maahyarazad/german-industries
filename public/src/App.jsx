
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { useEffect, useRef } from "react";
import LandingPage from './pages/LandingPage';
import VideoPage from './pages/VideoPage';
import Layout from './components/Layout';
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // pick one of the two above
import RegistrationPage from "./pages/RegisterationPage";
import LoginPage from './pages/LoginPage';

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

        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="videos" element={<VideoPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

