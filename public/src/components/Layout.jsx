// src/components/Layout.jsx
import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import AppSnackbar from "../components/Snackbar";

const Layout = () => {
  const [user, setUser] = useState({ name: "Maahyar" }); 

  const handleLogout = () => setUser(null);

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <main style={{margin : "0 auto"}}>
        <Outlet />
      </main>
      <AppSnackbar />
    </>
  );
};

export default Layout;
