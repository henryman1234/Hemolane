import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import "./layout.scss";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";

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

const RequireAuthLayout = function () {

    const {currentUser} = useContext(AuthContext) as AuthContextType


    if (!currentUser) {
        return (
            <Navigate to="/login"/>
        )
    } else {
        return (
            <div className="layout">
                <Navbar/>
                <main>
                <Outlet/> 
                </main>
            </div>
        )
    }
}


export {Layout, RequireAuthLayout}