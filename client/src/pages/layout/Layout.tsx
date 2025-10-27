import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import "./layout.scss";

const Layout = function () {
    return (
        <div className="layout">
            <Navbar/>
            <main>
               <Outlet/> 
            </main>
        </div>
    )
}

export default Layout