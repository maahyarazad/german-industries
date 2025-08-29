// components/Header.jsx
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";

const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAppState(); // signals-react state
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggleDrawer = (open) => () => setDrawerOpen(open);
    
    useEffect(() => {
        const savedUser = localStorage.getItem("gic-user");
        if (savedUser && (!user.value || Object.keys(user.value).length === 0)) {
            try {
                user.value = JSON.parse(savedUser);
                setIsLoggedIn(user.value && Object.keys(user.value).length > 0)
            } catch (err) {
                console.error("Failed to parse saved user:", err);
                localStorage.removeItem("gic-user"); 
            }
        }
  }, [user]);

  useEffect(()=>{
    setIsLoggedIn(user.value && Object.keys(user.value).length > 0)
  }, [user])

   const handleLogout = async () => {
          try {
              

              const response = await fetch(`${import.meta.env.VITE_SERVER_URL_GIC}/gic-user/logout`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                   credentials: "include"
              });
  
              const data = await response.json();
  
              if (!data.authenticated) {
                  navigate("/")
                  user.value = null;
                //   setIsLoggedIn(false);
                localStorage.removeItem("gic-user"); 
                  
                  
              }
              
  
          } catch (error) {
              console.error("Failed to logout user:", error);
          } finally {
              
          }
      };




  const guestLinks = (
    <Box display="flex" gap={2}>
      <Button
        color="inherit"
        className="text-capitalize"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Button
        color="secondary"
        className="text-capitalize"
        variant="contained"
        onClick={() =>
          window.location.assign(
            "https://services.german-emirates-club.com/registration/gic-registration"
          )
        }
      >
        Register
      </Button>
    </Box>
  );

  const userLinks = (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="body1">
        Welcome, {user.value?.firstName || "User"}
      </Typography>
      <Button color="inherit" className="text-capitalize" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Brand Name */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            German Industrial Club
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (isLoggedIn ? userLinks : guestLinks)}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          {isLoggedIn ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>Welcome, {user.value?.firstName}</Typography>
              <Button
                variant="text"
                color="primary"
                onClick={handleLogout}
                className="text-capitalize"
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              {guestLinks}
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
