// components/Header.jsx
import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Header = ({ user, onLogout }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const guestLinks = (
        <>
            <Button color="inherit" sx={{ textTransform: "none" }}>
                Login
            </Button>
            <Button color="secondary" sx={{ textTransform: "none" }} variant="contained">
                Register
            </Button>
        </>
    );

    const userLinks = (
        <>
            <Typography variant="body1" sx={{ mr: 2 }}>
                Welcome, {user?.name}
            </Typography>
            <Button
                color="inherit"
                onClick={onLogout}
                sx={{ textTransform: "none" }}
            >
                Logout
            </Button>
        </>
    );

    return (
        <>
            <AppBar position="absolute" sx={{ backgroundColor: theme.palette.primary.main, top: 0 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Brand Name */}
                    <Typography variant="h6" component="div">
                        German Industrial Club
                    </Typography>

                    {/* Desktop Menu */}
                    {!isMobile && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {user ? userLinks : guestLinks}
                        </Box>
                    )}

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
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250, p: 2 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                >
                    {user ? (
                        <>
                            <Typography sx={{ mb: 1 }}>Welcome, {user.name}</Typography>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={onLogout}
                                sx={{ textTransform: 'none' }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="d-flex flex-column">
                            <Button
                                // variant="text"
                                color="primary"
                                sx={{ textTransform: 'none' }}
                            >
                                Login
                            </Button>
                            <Button variant="contained" color="secondary">
                                Register
                            </Button>
                        </div>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
