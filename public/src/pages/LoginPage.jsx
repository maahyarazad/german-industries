
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { snackbarSignal } from '../components/Snackbar';
import { InputAdornment, IconButton } from "@mui/material";
import { CiLock } from "react-icons/ci";
import { useAppState } from "../AppState";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const LoginPage = ({onAuth}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {user} = useAppState();
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address.")
            .required("Email is required."),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);

            // Send login request (JSON body instead of FormData)
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL_GIC}/gic-user/login`, {
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
                onAuth?.(true)
                user.value = data.user;
                localStorage.setItem("gic-user", JSON.stringify(data.user));
                // Redirect to dashboard or homepage
                navigate("/videos")
            }
            

        } catch (error) {
            onAuth?.(false)
            snackbarSignal.open({
                message: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-page" style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2 className="mb-3">Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            className="pb-2"
                            as={TextField}
                            fullWidth
                            size="small"
                            name="email"
                            label="Email"
                            error={touched.email && Boolean(errors.email)}
                            helperText={<ErrorMessage name="email" />}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box className="mb-3">
                            <Field
                                as={TextField}
                                fullWidth
                                size="small"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                label="Password"
                                error={touched.password && Boolean(errors.password)}
                                helperText={<ErrorMessage name="password" />}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CiLock /> 
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                            style={{ height: 40, fontSize: 16 }}
                        >
                            {isSubmitting ? <CircularProgress size={20} /> : "Login"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
