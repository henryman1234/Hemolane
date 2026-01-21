import React, { useEffect, useState } from "react"
import "./reservations.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReservationItem from "../../components/reservationItem/ReservationItem";

export type Reservation = {
    _id: string,
    date: string,
    contact: string,
    author: string,
    time: string,
    createdAt: string
    rhesus: string,
    blood: string
}


const ReservationsPage = function () {

    const  [reservations, setReservations] = useState<Reservation[] | null>(null)
    const navigate = useNavigate()
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL

    
useEffect(function() {

    const handleReservation = async function () {

        try {

            const res = await fetch(`${apiUrl}/api/reservations`, {
                method: "GET",
                credentials: "include",
                cache: "no-cache",
                headers: {
                    Accept: "application/json; charset=UTF-8"
                },
            })

            if (res.ok) {
                const data = await res.json()
                setReservations(data.data)
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsCreating(false)
        }
    }

    handleReservation()

}, [])


    return (
        <div className="reservationsPage">
            <div className="pageContainer">

                <div className="pageWrapper">
                    {reservations?.map(function(reserv){
                        return (
                            <ReservationItem key={reserv._id} _id={reserv._id} blood={reserv.blood} rhesus={reserv.rhesus} date={reserv.date} time={reserv.time} createdAt={reserv.createdAt} contact={reserv.contact} author={reserv.author} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ReservationsPage