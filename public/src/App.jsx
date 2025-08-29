
import './App.css'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import { useEffect, useRef, useState } from "react";
import LandingPage from './pages/LandingPage';
import VideoPage from './pages/VideoPage';
import Layout from './components/Layout';
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // pick one of the two above
import ProtectedRoute from './components/ProtectedRoute';
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
  const [authenticated, setAuthenticated] = useState(false);
  const handleAuth = (success) => {
    setAuthenticated(success);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/gic-user/check-auth", {
          method: "GET",
          credentials: "include", // send cookies
        });


        if (!res.ok) throw new Error("Network response was not ok");
        setAuthenticated(true);


      } catch (err) {
        debugger;
        setAuthenticated(false);
      } finally {

      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <RouteLoader />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage onAuth={handleAuth} />} />

          {/* Protected route inside Layout */}
          <Route
            path="videos"
            element={
              authenticated ? <VideoPage /> : <Navigate to="/login" replace />
            }
          />
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

