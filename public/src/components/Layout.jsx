// src/components/Layout.jsx
import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [user, setUser] = useState({ name: "Maahyar" }); 

  const handleLogout = () => setUser(null);

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <main style={{margin : "0 auto"}}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
