// components/Header.jsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const guestLinks = (
    <div className="d-flex gap-2">
      <Button color="inherit" className="text-capitalize">
        Login
      </Button>
      <Button
        color="secondary"
        className="text-capitalize"
        variant="contained"
        onClick={() => navigate("/registration")}
      >
        Register
      </Button>
    </div>
  );

  const userLinks = (
    <div className="d-flex align-items-center gap-3">
      <span className="fw-normal">Welcome, {user?.name}</span>
      <Button color="inherit" onClick={onLogout} className="text-capitalize">
        Logout
      </Button>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: theme.palette.primary.main, top: 0 }}
      >
        <Toolbar className="d-flex justify-content-between">
          {/* Brand Name */}
          <h6 className="m-0 fw-bold" onClick={()=> navigate("/")}>German Industrial Club</h6>

          {/* Desktop Menu */}
          {!isMobile && (user ? userLinks : guestLinks)}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          className="p-3"
          role="presentation"
          onClick={toggleDrawer(false)}
          style={{ width: "250px" }}
        >
          {user ? (
            <div className="d-flex flex-column gap-2">
              <div className="mb-2">Welcome, {user.name}</div>
              <Button
                variant="text"
                color="primary"
                onClick={onLogout}
                className="text-capitalize"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">{guestLinks}</div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Header;
