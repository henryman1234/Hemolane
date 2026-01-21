import React, { useState } from "react";
import "./reservationItem.scss";
import { formatDate } from "../../utils/date";
import Avatar from "../../../public/images/noavatar.jpg"
import { useNavigate } from "react-router-dom";


export type Reservation = {
    _id: string,
    date: string,
    contact: string,
    author: string
    time: string,
    createdAt: string
    rhesus: string,
    blood: string
}


const ReservationItem = function ({author, _id, createdAt, contact, time, date, blood, rhesus }: Reservation) {

    const navigate = useNavigate()
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL
    console.log(author)
    

    const handleDelete = async function () {

        try {

            const res = await fetch(`${apiUrl}/api/reservations/${_id}`, {
                method: "DELETE",
                credentials: "include",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)
            }

            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsCreating(false)
        }
    }


    return (

        <div  className="reservationItem">

            <div className="head">
                <div className="infos">
                    <img alt="Image de l'auteur" src={Avatar} />
                    <h4>{author}</h4>
                </div>
            <div className="extras">
                    <span className="time">{formatDate(createdAt)}</span>
                    <img onClick={handleDelete}  className="icon" src="/images/delete.svg" alt="" />
            </div>
            </div>

            {/* <p className="description">{description}</p> */}

            <div className="reservationDetails">
                <div>Groupe Sanguin voulue:  <strong>{blood}</strong> </div> 
                <div>Rhésus voulue:  <strong>{rhesus}</strong></div>
                <div>Date voulue:  <strong>{date}</strong></div>
                <div>Heure voulue:  <strong>{time}</strong></div>
                <div>Contact du client:  <strong >{contact}</strong></div>
            </div>

            
        </div>
    )
}

export default ReservationItem