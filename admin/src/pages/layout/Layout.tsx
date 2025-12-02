import React from "react";
import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import Footer from "../../components/footer/Footer";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { useContext } from "react";

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

const RequireAuthLayout = function () {

    const {currentUser} = useContext(AuthContext) as AuthContextType

    if (!currentUser) {
        return <Navigate to="/login"/>
    } else {
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
}

export  {Layout, RequireAuthLayout}