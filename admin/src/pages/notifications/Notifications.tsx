import React, { useEffect, useRef, useState } from "react"
import "./notifications.scss";
import NotificationItem from "../../components/noticationItem/NotificationItem";
import { useAdminNotification } from "../../hooks/useAdminNotifications";
import { useLocation } from "react-router-dom";


export interface Notification  {
    _id: string,
    order: string,
    type: string
    user: {
        _id: string,
        username: string,
        email: string,
        avatarUrl?:string
    },
    hospital: {
        name: string,
        _id: string
    },
    priority: string
    bloodBank: string
    message: string,
    contact: string,
    createdAt: string,
}


const Notifications = function () {

    const notifications = useAdminNotification()
    const location = useLocation()
    const [notificationId, setNotificationId] = useState(location.state?.id)
    const notificationRef = useRef<HTMLDivElement[] | null>(null)
    console.log(notificationRef)

    useEffect(function(){
        if (notificationId  && notificationRef.current  ) {
            notificationRef.current[notificationId]?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }
    }, [notificationId])

    return (
        
        <div className="notificationsPage">

            <div className="notificationsContainer">

                <h2>Toutes les notifications</h2>
                
                <div className="notificationsWrapper">

                    {notifications.map(function(notification: Notification){
                        return (

                            <NotificationItem user={notification.user} _id={notification?._id} createdAt={notification.createdAt} hospital={notification?.hospital} bloodBank={notification?.bloodBank} contact={notification.contact} priority={notification.priority} key={notification._id} author={notification?.user?.username} description={notification.message}  time="18H34"/>

                        )
                    })}


                </div>

            </div>

        </div>
    )
}

export default Notifications