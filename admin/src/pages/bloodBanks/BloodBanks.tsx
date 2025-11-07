import React, { useEffect, useState } from "react";
import "./bloodBanks.scss";
import DataTable from "../../components/dataTable/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";

const BloodBanks = function () {

    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [bloodBanks, setBloodBanks] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const location = useLocation()
    const path = location.pathname

    useEffect(function() {
        setIsFetching(true)
        const fetchAllBloodBanks = async function () {
            try {

                const res = await fetch(`${apiUrl}/bloodBanks`, {
                    method: "GET",
                    cache: "no-store",
                    credentials: "include",
                    headers: {
                        Accept: "applicataion/json; charset=utf-8"
                    }
                })

                if (res.ok) {
                    const data = await res.json()
                    setBloodBanks(data?.data)
                }
                
            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }
        }

        fetchAllBloodBanks()

    }, [])

    const columns: GridColDef[] = [
        {
            field: "_id",
            width: 70,
            headerName: "ID",
            editable: true

        },
        {
            field: "name",
            headerName: "Nom de la banque",
            width: 150,
            editable: true
        },
        {
            field: "type",
            headerName: "Groupe sanguin",
            width: 130,

        },
        {
            field: "rhesus",
            headerName: "Rhésus",
            width: 130,
            editable: true
        },
        {
            field: "status",
            headerName: "Disponibilité",
            editable: true,
            width: 150
        }

    ]

    

    return (
        <div className="bloodBanks">
            <div className="info">
                <h1>Toutes les banques de sangs</h1>
                <button>Ajouter une banque</button>
            </div>

            <DataTable path={path} columns={columns} rows={bloodBanks} />
        </div>
    )
}

export default BloodBanks