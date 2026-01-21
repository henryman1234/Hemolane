import React, { type Dispatch, type SetStateAction } from "react"
import "./notificationsBox.scss";

interface props {
    length: number,
    setIsModalOpened: Dispatch<SetStateAction<boolean>>,
    isModalOpened?: boolean
}

const NotificationsBox =  function ({length, setIsModalOpened, isModalOpened}: props) {

    return (
        <div className="notifications" onClick={function() {
            setIsModalOpened(true)
        }}>
            <img src="/images/notifications.svg" alt="" className="ring" />
            {length > 0 && <span>{length}</span>}
        </div>
    )
}

export default NotificationsBox