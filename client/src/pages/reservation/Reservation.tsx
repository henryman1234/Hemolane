import React, { useContext, useRef, useState } from "react";
import "./reservation.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { toast } from "react-toastify";


const ReservationPage = function () {
    const navigate = useNavigate()
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState("")
    const  {currentUser} = useContext(AuthContext) as AuthContextType
    const apiUrl = import.meta.env.VITE_API_URL
    const formRef = useRef<HTMLFormElement | null>(null)
    const author = currentUser?.username

    

    const handleSubmit = async function (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const contact = formData.get("contact")
        const blood = formData.get("blood")
        const rhesus = formData.get("rhesus")
        const date = formData.get("date")
        const time = formData.get("time")


        try {

            const res = await fetch(`${apiUrl}/api/reservations`, {
                method: "POST",
                credentials: "include",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({contact, author, time, date, rhesus, blood})
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data.data)
                formRef.current?.reset()
                toast.success("Commande envoyée avec succès", {
                    draggable: true,
                    hideProgressBar: false,
                    autoClose: 3000,
                    position: "top-right",
                    closeOnClick: true
                })
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="reservationPage">

            <div className="pageContainer">

                <form onSubmit={handleSubmit} ref={formRef}  className="form" >

                    <div className="reservationTitle">Formulaire de reservation</div>

                    <div className="reservationItem">
                        <label htmlFor="blood">Groupe sanguin désiré</label>
                        <select name="blood"  className="select">
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="O+">O+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O-">O-</option>
                        </select>
                        
                    </div>

                    <div className="reservationItem">
                        <label htmlFor="rhesus">Rhesus désiré</label>
                        <select name="rhesus"  className="select">
                            <option value="Positif">Positif</option>
                            <option value="Négatif">Négatif</option>
                        </select>
                    </div>


                    <div className="reservationItem ">
                        <label id="date" htmlFor="date">Date souhaitée</label>
                        <input type="date" name="date" />
                    </div>

                    <div className="reservationItem ">
                        <label id="time" htmlFor="time">Heure souhaitée</label>
                        <input type="time"  name="time"/>
                        
                    </div>

                    <div className="reservationItem">
                        <label htmlFor="contact">Contact joignable du commanditaire</label>
                        <input type="text" required maxLength={12} id="contact" name="contact" placeholder="Votre contact ex: 650 876 954 / 658 055 953"/>
                    </div>


                    <div className="reservationItem">
                        <button className="loginButton">Commander</button>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default ReservationPage