import React from "react";
import "./bloodCard.scss"
import { Link } from "react-router-dom";
import {FaCheck, FaCheckCircle, FaToolbox} from "react-icons/fa"
import {MedalIcon, ToggleLeft} from "lucide-react"

interface ItemType  {
    item: {
        name: string,
        _id: string,
        type: string,
        image: Array<string>,
        desc: string,
        rhesus: string
        status?: string,
        hospital: {
            name: string,
            address: string,
            lat?: number,
            lng?: number
            city: string,

        }
    }
    
}

const BloodCard = function ({item}: ItemType) {
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
                            <img src="/images/save.png" alt="" />
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