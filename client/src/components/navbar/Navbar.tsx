import React, { useContext, useState } from "react"
import "./navbar.scss";
import { Link } from "react-router-dom";
import {AuthContext, type AuthContextType} from "../../context/AuthContext"

const Navbar = function () {

    const [open, setOpen] = useState(false)
    const handleClik = function () {
        setOpen(!open)
    }
    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextType


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

                    {currentUser ? (
                        <div className="user">
                            <img src={currentUser?.avatarUrl || "/images/noavatar.jpg"} alt="Avatar de l'utilisateur"/>
                            <span>{currentUser?.username}</span>
                            <Link  to="/profile" className="redirectProfile">
                                Profile
                            </Link>
                        </div>
                    ) : <>

                        <Link to="/login" className="login">Connexion</Link>
                        <Link to="/register" className="register">S'incrire</Link>

                    </>}

                    {/* Mobile Display */}
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
                        }} to="/">Connexion</Link>
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