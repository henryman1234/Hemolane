import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {AuthContext, type AuthContextType} from "../../context/AuthContext"
import "./orderPage.scss";
import { toast } from "react-toastify";

const OrderPage = function () {

    const {bloodBankId, hospitalId}= useParams()
    console.log(bloodBankId, hospitalId)
    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const [order, setOrder] = useState({})
    const formRef = useRef<HTMLFormElement | null>(null)


    const handleOrder = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsFetching(true)
        const formData = new FormData(e.currentTarget)
        const priority = formData.get("priority")
        const contact = formData.get("contact")
        const message = formData.get("message")
        try {
            const res = await fetch (`${apiUrl}/api/orders/${bloodBankId}/orders/${hospitalId}`, {
                method: "POST",
                cache: "no-store",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8"
                },
                body: JSON.stringify({priority, message, contact})

            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)

                toast.success("Commande envoyéé avec succès", {
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    hideProgressBar: false,
                    position: "top-right"
                })
                formRef.current?.reset();
            }
            
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }
    }


    return (

        <div className="orderPage">

            <div className="pageContainer">

                <form ref={formRef}  className="form" onSubmit={handleOrder}>

                    <div className="orderTitle">Formulaire de  commande</div>

                    <div className="orderItem">
                        <label htmlFor="contact">Contact joignable du commanditaire</label>
                        <input type="text" required maxLength={12} id="contact" name="contact" placeholder="Votre contact ex: 650 876 954 / 658 055 953"/>
                    </div>



                    <div className="orderItem ">
                        <label id="priority" htmlFor="username">Priorité de la commande</label>
                        <select name="priority"  className="select">
                            <option value="Immédiate">Immédiate</option>
                            <option value="Moyenne">Moyenne</option>
                            <option value="Elective">Elective</option>
                        </select>
                    </div>

                    <div className="orderItem">
                        <label id="name" htmlFor="username">Message de commande</label>
                        <textarea  placeholder="Ecrivez le message de votre commande" required minLength={20} name="message"></textarea>
                    </div>



                    <div className="orderItem">
                        <button className="loginButton">Commander</button>
                    </div>


                </form>
            </div>
        </div>
    )
}

export  default OrderPage