import React, { useContext, useState } from "react";
import "./navbar.scss";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = function () {

    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isDisconnecting, setIsDisconnecting] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL

    const handleLogout = async function () {
        setError("")
        setIsDisconnecting(true)

        try {

            const res = await fetch(`${apiUrl}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
                cache:"no-store",
                headers: {
                    "Content-Type": "appliction/json; charset=utf-8"
                }
            })

            if (res.ok) {

                const data = await res.json()
                console.log(data)
                toast.success("Déconnecté avec succès", {
                    closeOnClick: true,
                    draggable: true,
                    hideProgressBar: false,
                    autoClose: 3000,
                })
                updateUser(null)

                navigate("/login")
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsDisconnecting(false)
        }
    }

    return (
        <div className="navbar">
            <div className="logo">
                <img src="/images/logosaas.png" alt="" />
                <span>HemoLane</span>
            </div>

            <div className="icons">
                <img src="/images/search.svg" alt="" className="icon" />
                <div className="notifications">
                    <img src="/images/notifications.svg" alt="" className="ring" />
                    <span>1</span>
                </div>
                {currentUser ? <>
                    <div className="user">
                        <img src={currentUser?.avatarUrl || "/images/noavatar.png"} className="avatar" alt=""  />
                        <span>{currentUser?.username}</span>
                        <img src="/images/logout.svg" alt="" className="icon" onClick={handleLogout} />
                    </div>

                </> : <Link to="/login" className="connectLink">Se connecter</Link>}


            </div>
        </div> 
    )
}

export default Navbar