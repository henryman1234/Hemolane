import React from "react";
import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";

const Layout = function () {
    return (
        <div className="layout">
            <Navbar/>
            <div className="containerApp">
                <div className="menuContainer">
                    <Menu/>
                </div>
                <div className="contentContainer">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout