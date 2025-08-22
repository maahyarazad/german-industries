// LandingPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        
            <div className="d-flex flex-column justify-content-center">
                <div>

                    <h1 variant="h1" fontWeight="bold" className="h1 h-md-1">
                        German Industrial Club
                    </h1>

                    <h2 variant="h6" color="text.secondary" mb={4}>
                        Connecting industries, ideas, and innovation.
                    </h2>
                </div>
                <div>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ textTransform: "none", width: "200px" }}
                        onClick={() => navigate("/videos")}>
                        Go to Videos
                    </Button>
                </div>

            </div>
    );
};

export default LandingPage;
