import React from "react"
import "./map.scss";
import {
    MapContainer as BaseMapContainer,
    TileLayer as BaseTileLayer,
    Marker,
    Popup
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Pin from "../pin/Pin";

// Relax React-Leaflet component prop types to avoid TS prop mismatches while keeping runtime behavior
const MapContainer = BaseMapContainer as React.ComponentType<any>;
const TileLayer = BaseTileLayer as React.ComponentType<any>;

interface Hospital {
    name: string;
    address: string;
    lat?: number;
    lng?: number;
    city: string;
    _id?: string;
}

export interface ItemType {
    name: string;
    _id: string;
    type: string;
    image?: string[];
    desc: string;
    status?: string;
    hospital: Hospital;
}

interface MapProps {
    items: ItemType[];
}

const Map = function ({items}: MapProps) {

    const position: [number, number] = [3.866667, 11.516667]

    return (
        <div className="map">
            <MapContainer className="map" center={position} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {items.map(function(item: ItemType) {
                    return (
                        <Pin key={item?._id} item={item}/>
                    )
                })}
                
            </MapContainer>
        </div>
    )
}

export default Map