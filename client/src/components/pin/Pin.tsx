import React from "react";
import "./pin.scss";
import {Marker, Popup} from "react-leaflet"
import { Link } from "react-router-dom";
import type { ItemType } from "../map/Map";

interface PinProps {
    item: ItemType;
}

const Pin = function ({item}: PinProps) {
    
    if (typeof item.hospital?.lat !== "number" || typeof item.hospital?.lng !== "number") {
        return null;
    }

    const position: [number, number] = [item.hospital?.lat, item.hospital?.lng];

    const imageSrc = item.image && item.image.length > 0 ? item.image[0] : "/images/8.jpg";

    return (
        <Marker position={position}>
            <Popup>
                <div className="popupContainer">
                    <img src={imageSrc} alt="" />
                    <div className="textContainer">
                        <Link to={`/list/${item?._id}`} >{item.name}</Link>
                        <span>Sang {item?.type}</span>
                        <b>{item.hospital.name}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}

export default Pin