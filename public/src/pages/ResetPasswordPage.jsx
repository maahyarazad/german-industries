
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Paper, Button, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";

import { snackbarSignal } from '../components/Snackbar';
import { CiLock } from "react-icons/ci";
import { useAppState } from "../AppState";
import { useLocation, useNavigate } from "react-router-dom";


const ResetPasswordPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, setUser } = useAppState();
    const navigate = useNavigate();
    const location = useLocation();

    const initialValues = {
        email: "",
        
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address.")
            .required("Email is required."),
        
    });

    const handleSubmit = async (values) => {
        // If user was redirected to login, this will be the "from" route
        const from = location.state?.from?.pathname || "/videos";

        try {
            setIsSubmitting(true);

            // Send login request (JSON body instead of FormData)
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL_GIC}/gic-user/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include"
            });

            const data = await response.json();

            snackbarSignal.open({
                message: data.message,
                messageType: data.status,
            });

            if (data.status) {
                setUser(data.user); // persist to state + localStorage
                navigate(from, { replace: true }); // 🔑 redirect to last attempted page
            }


        } catch (error) {

            snackbarSignal.open({
                message: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-page" style={{ maxWidth: 400, margin: "50px auto" }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Paper elevation={3}
                        sx={{
                            p: { xs: 2, sm: 3, md: 5 },        // smaller padding on mobile, bigger on desktop
                            py: { md: 10 },        // smaller padding on mobile, bigger on desktop
                            px: { md: 7 },        // smaller padding on mobile, bigger on desktop
                            maxWidth: { xs: "100%", sm: 700 }, // full width on small screens, 400px on larger
                            mx: "auto",                        // centers horizontally
                            my: { xs: 2, sm: 4, md: 10 },              // vertical margin (top & bottom)
                            borderRadius: 2,                   // optional rounded corners
                        }}>


                        <Form>
                            <h2 className="pb-5">Reset Your Password</h2>
                            <Field
                                className="pb-3"
                                as={TextField}
                                fullWidth
                                size="small"
                                name="email"
                                label="Email"
                                error={touched.email && Boolean(errors.email)}
                                helperText={<ErrorMessage name="email" />}
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <Email />
                            //         </InputAdornment>
                            //     ),
                            // }}
                            />



                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                                style={{ height: 40, fontSize: 16 }}
                                className="mt-2"
                            >
                                {isSubmitting ? <CircularProgress size={20} /> : "Reset Your Password"}
                            </Button>
                        </Form>
                        <div className="d-flex mt-3">
                        <a href="/login">Back to Login</a>
                    </div>

                    </Paper>
                )}
            </Formik>
        </div>
    );
};

export default ResetPasswordPage;
