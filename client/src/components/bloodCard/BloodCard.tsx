import React, { useContext, useState, useTransition } from "react";
import "./bloodCard.scss"
import { Link, useLocation } from "react-router-dom";
import {FaCheck, FaCheckCircle, FaToolbox} from "react-icons/fa"
import {MedalIcon, ToggleLeft} from "lucide-react"
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import type { ItemType as MapItemType } from "../map/Map";

interface BloodCardProps {
    item: MapItemType & { rhesus: string},
    path?: string
}

const BloodCard = function ({item, path}: BloodCardProps) {

    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const {currentUser} = useContext(AuthContext) as AuthContextType

    const handleSaveBloodBank = async function () {
        setError("")
        setIsFetching(true)
        try {
            
            const res = await fetch(`${apiUrl}/api/users/${currentUser?._id}/add/${item?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                cache: "no-store",
                credentials: "include"
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)
                
                toast.success("Ajouté avec succès", {
                    closeOnClick: true,
                    hideProgressBar: false,
                    autoClose: 3000,
                    position: "top-right",
                    draggable: true,
                })
            
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }
    }



    return (
        <div className="bloodCard">


            <div className="bloodCardContainer">

                <div className="left">
                    <h2 className="name">
                        <Link to={`/${item?._id}`}>{item?.name}</Link>
                    </h2>
                    <p className="address">
                        <img src="/images/pin.png" alt="" />
                        <span>{item?.hospital?.address}</span>
                    </p>

                    <div className="analysis">
                        <p className="type">{`Sang ${item?.type}`}</p>
                        <p className="rhesus">{`Rhésus ${item?.rhesus}`}</p>

                    </div>


                    <div className="features">
                        <div className="feature">
                            <FaToolbox className="icon"/>
                            <span>Disponible</span>
                        </div>

                        <div className="feature">
                            <FaCheckCircle className="icon"/>
                            <span>Vérifié</span>
                        </div>

                    </div>
                </div>



                <div className="right">

                    <div className="iconsBox">
                        <div className="iconBox">
                            <img onClick={handleSaveBloodBank} src="/images/save.png" alt="" />
                        </div>
                        <div className="iconBox">
                            <img  src="/images/chat.png" alt="" />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default BloodCard