import React, { useContext } from "react";
import "./navbar.scss";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";

const Navbar = function () {

    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextType

    return (
        <div className="navbar">
            <div className="logo">
                <img src="/images/logosaas.png" alt="" />
                <span>HemoLane</span>
            </div>

            <div className="icons">
                <img src="/images/search.svg" alt="" className="icon" />
                <img src="/images/app.svg" alt="" className="icon" />
                <img src="/images/expand.svg" alt="" className="icon" />
                <div className="notifications">
                    <img src="/images/notifications.svg" alt="" className="ring" />
                    <span>1</span>
                </div>
                <div className="user">
                    <img src={currentUser?.avatarUrl || "/images/noavatar.jpg"} alt=""  />
                    <span>{currentUser?.username}</span>
                </div>
                <img src="/images/settings.svg" alt="" className="icon" />
            </div>
        </div>
    )
}

export default Navbar