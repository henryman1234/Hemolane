import React from "react";
import "./navbar.scss";

const Navbar = function () {
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
                    <img src="/images/notifications.svg" alt="" className="icon" />
                    <span>1</span>
                </div>
                <div className="user">
                    <img src="/images/6.jpeg" alt="" className="icon" />
                    <span>Henry Euloge</span>
                </div>
                <img src="/images/settings.svg" alt="" className="icon" />
            </div>
        </div>
    )
}

export default Navbar