import React, { useState } from "react"
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = function () {

    const [open, setOpen] = useState(false)
    const handleClik = function () {
        setOpen(!open)
    }


    return (
        <nav className="navbar">
            <div className="navbarContainer">
                <div className="left">
                    <Link to="/" className="logo">
                        <img src="/images/logosaas.png" alt="" />
                        <span>HemoLane</span>
                    </Link>
                    <Link to="/">Acceuil</Link>
                    <Link to="/">Assistance</Link>
                    <Link to="/">FAQ</Link>
                </div>

                <div className="right">
                    <Link to="/" className="login">Se Connecter</Link>
                    <Link to="/" className="register">S'incrire</Link>
                    <div className="menuIcon">
                        <img src="/images/menu.png" alt="" onClick={handleClik} />
                    </div>
                    <div className={open ? "active menu": "menu"}>
                        <Link onClick={function(){
                            setOpen(false)
                        }} to="/">Acceuil</Link>
                        <Link onClick={function(){
                            setOpen(false)
                        }} to="/">Assistance</Link>
                        <Link onClick={function(){
                            setOpen(false)
                        }} to="/">Profile</Link>
                        <Link onClick={function(){
                            setOpen(false)
                        }} to="/">Se Connecter</Link>
                        <Link onClick={function(){
                            setOpen(false)
                        }} to="/">S'inscrire</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar