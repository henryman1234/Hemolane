import React, { useEffect, useState } from "react";
import "./hospitals.scss";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { useLocation } from "react-router-dom";

const Hospitals = function () {

    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [hospitals, setHospitals] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL

    const location = useLocation()
    const path= location.pathname

    useEffect(function(){
        setIsFetching(true)

        const fetchAllHospitals = async function () {

            try {

                const res = await fetch(`${apiUrl}/hospitals`, {
                    cache: "no-store",
                    method: "GET",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    },
                    credentials: "include"
                })

                if (res.ok) {
                    const data = await res.json()
                    setHospitals(data?.data)
                }
                
            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }

        }

        fetchAllHospitals()

    }, [])

    const imageStyle = {
        width: "35px",
        height: "35px",
        cursor: "pointer",
        borderRadius: "50%"
    }

    const columns: GridColDef[] =  [
        {field: "_id", headerName: "ID", width: 70, editable: true},
        {
            field: "avatarUrl",
            headerName: "Image",
            type: "string",
            editable: true,
            width: 100,
            renderCell: function (params: GridRenderCellParams) {
                return (
                    <img style={imageStyle} src={params?.value || "/images/noavatar.jpg"} alt="" />
                )
            }
        },
        {
            field: "name",
            editable: true,
            width: 170,
            headerName: "Nom Hopital",
            type: "string"
        },
        {
            field: "city",
            headerName: "Ville",
            type: "string",
            width: 120,
            editable: true
        },
        {
            field: "address",
            headerName: "Addresse",
            type: "string",
            width: 150
        },
        {field: "lat", type: "number", headerName: "Latitude", width: 150, editable: true },
        {field: "lng", type: "number", headerName: "Longitude", width: 150, editable: true },

    ]


    if (isFetching) {
        return (
            <div>Chargement...</div>
        )
    }


    return (
        <div className="hospitals">
            <div className="info">
                <h1>Les Hopitaux</h1>
                <button>ajouter un hopital</button>
            </div>

            <DataTable path={path} rows={hospitals} columns={columns}/>

            
        </div>
    )
}

export default Hospitals