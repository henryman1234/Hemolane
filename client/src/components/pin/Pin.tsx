import React from "react";
import "./pin.scss";
import {Marker, Popup} from "react-leaflet"
import { Link } from "react-router-dom";

interface ItemType  {
    item: {
        name: string,
        id: number,
        type: string,
        image: Array<string>,
        desc: string,
        status?: string,
        hospital: {
            name: string,
            address: string,
            lat?: number,
            lng?: number
            city: string
        }
    }
    
}


const Pin = function ({item}) {
    return (
        <Marker position={[item.hospital.lat, item.hospital.lng]}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.image[0]} alt="" />
                    <div className="textContainer">
                        <Link to={`/list/${item?.id}`} >{item.name}</Link>
                        <span>Sang {item?.type}</span>
                        <b>{item.hospital.name}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}

export default Pin