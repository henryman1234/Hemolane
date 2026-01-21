import React, { useContext, useState } from "react";
import "./navbar.scss";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NotificationsBox from "../notificationsBox/NotificationsBox";
import NotificationItem from "../noticationItem/NotificationItem";
import { useAdminNotification, type Notification} from "../../hooks/useAdminNotifications";
import { FaTimes} from "react-icons/fa";


const Navbar = function () {

    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isDisconnecting, setIsDisconnecting] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const [isModalOpened,setIsModalOpened] = useState(false)
    const notifications = useAdminNotification()
    console.log(currentUser)

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
                <NotificationsBox length={notifications.length} setIsModalOpened={setIsModalOpened}/>


                {/* Modal for notifications */}
                {isModalOpened && <aside className="notificationsModal" >
                    <span className="close">
                        <p>Fermer</p>
                        <FaTimes className="closeBtn" onClick={function(){
                            setIsModalOpened(false)
                        }}/>
                    </span>

                    <div className="notificationItems">

                        <div className="notificationsTitle">
                            <h3>Notifications</h3>
                            <NotificationsBox isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} length={notifications.length}/>
                        </div>

                        <div className="notificationsWrapper">

                            {notifications.length === 0 && <p>Aucune notification pour le moment</p>}

                            {notifications.map(function(notification: Notification){
                                return (
                                    <NotificationItem user={notification?.user} _id={notification?._id} createdAt={notification.createdAt} hospital={notification.hospital} bloodBank={notification.bloodBank} key={notification?._id} contact={notification.contact} priority={notification.priority} author={notification.user.username} time="12h23" description={notification?.message}/>
                                )
                            })}

                        </div>
                        

                    </div>

                </aside>}


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