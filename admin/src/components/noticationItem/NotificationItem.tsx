import React, { useEffect, useState } from "react";
import "./notificationItem.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminNotification } from "../../hooks/useAdminNotifications";
import { formatDate } from "../../utils/date";
import Avatar from "../../../public/images/noavatar.jpg"

interface Props {
    _id?: string
    author: string,
    description: string,
    time: string ,
    hospital:{
        name: string,
        _id: string
    },
    bloodBank: string,
    user: {
        _id: string,
        username: string,
        email: string,
        avatarUrl?: string
    },
    contact: string,
    priority: string,
    createdAt: string

}

interface BloodBankProps {
    name: string,
    _id: string,
    rhesus: string,
    type: string,
    status: string,
    desc:string,
    images? : Array<string>,
}


const NotificationItem = function ({author, user, description, _id, bloodBank, hospital, contact, priority, createdAt}: Props) {

    const apiUrl = import.meta.env.VITE_API_URL
    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState(true);
    const  [identifiedBloodBank, setIdentifiedBloodBank] = useState<BloodBankProps | null>(null)
    const navigate = useNavigate()

    const [currentId, setCurrentId] = useState(_id)

    const handleNavigate = function () {
        navigate("/notifications", {state: {id: currentId}})
    }

    const handleDelete = async function () {
        setError("");
        setIsFetching(true)
        try {

            const res = await fetch(`${apiUrl}/api/notifications/${_id}`, {
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
            setIsFetching(false)
        }
    }


    useEffect(function(){
        setError("")
        setIsFetching(true)
        const handleBloodbankDetails = async function () {
            try {
                const res = await fetch(`${apiUrl}/api/bloodBanks/${bloodBank}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    },
                    credentials: 'include',
                    cache: "no-store"
                })

                if (res.ok) {
                    const data = await res.json()
                    console.log(data.data)
                    setIdentifiedBloodBank(data.data)
                }
            } catch (err: any) {
                setError(err?.message)
            }finally {
                setIsFetching(false)
            }
        }

        handleBloodbankDetails();


    }, [])

    if (isFetching) {
        return (
            <div>Chargement...</div>
        )
    }

    

    return ( 
    <div onClick={handleNavigate} className="notificationItem">
        <div className="head">
            <div className="infos">
                <img alt="Image de l'auteur" src={user.avatarUrl || Avatar} />
                <h4>{author}</h4>
            </div>
           <div className="extras">
                <span className="time">{formatDate(createdAt)}</span>
                <img onClick={handleDelete}  className="icon" src="/images/delete.svg" alt="" />
           </div>
        </div>

        <p className="description">{description}</p>

        <div className="orderDetails">
            <div>Nom de la banque: <strong>{identifiedBloodBank?.name}</strong> </div>
            <div>Groupe Sanguin: <strong>{identifiedBloodBank?.type}</strong> </div> 
            <div>Rhésus: <strong>{identifiedBloodBank?.rhesus}</strong></div>
            <div>Hopital: <strong>{hospital?.name}</strong></div>
            <div>Contact: <strong>{contact}</strong></div>
            <div>Priorité: <strong >{priority}</strong></div>
        </div>

            
        </div>
    )
}

export default NotificationItem