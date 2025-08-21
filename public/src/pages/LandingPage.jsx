// LandingPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        
            <div className="d-flex flex-column justify-content-center">
                <div>

                    <Typography variant="h1" fontWeight="bold" gutterBottom >
                        German Industrial Club
                    </Typography>

                    <Typography variant="h6" color="text.secondary" mb={4}>
                        Connecting industries, ideas, and innovation.
                    </Typography>
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
