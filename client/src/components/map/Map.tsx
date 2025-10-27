import React from "react"
import "./map.scss";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Pin from "../pin/Pin";

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

const Map = function ({items}) {

    const position = [3.866667, 11.516667]

    return (
        <div className="map">
            <MapContainer className="map" center={position} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {items.map(function(item: ItemType) {
                    return (
                        <Pin key={item?.id} item={item}/>
                    )
                })}
                
            </MapContainer>
        </div>
    )
}

export default Map