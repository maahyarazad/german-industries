// LandingPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";
const LandingPage = () => {
    const navigate = useNavigate();


    return (
        
            <div className="d-flex flex-column justify-content-center">
                <div className="landing-page">

                    <h1>
                        German Industrial Club
                        
                    </h1>

                    <h2>
                        Connecting industries, ideas, and innovation.
                    </h2>
                </div>
                <div>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ textTransform: "none", width: "200px" }}
                        onClick={() => navigate("/login")}>
                        Login to continue
                    </Button>
                </div>

            </div>
    );
};

export default LandingPage;
