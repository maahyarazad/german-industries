// src/components/Layout.jsx
import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import AppSnackbar from "../components/Snackbar";

const Layout = () => {
  
  return (
    <>
      <Header />
      <main style={{margin : "0 auto"}}>
        <Outlet />
      </main>
      <AppSnackbar />
    </>
  );
};

export default Layout;
