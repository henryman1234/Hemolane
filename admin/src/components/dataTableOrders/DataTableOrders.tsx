import React from "react"
import "./dataTableOrders.scss";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";


const DataTableOrders = function () {


    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: "ID",
            editable: true,
            type: "string",
            width: 70
        },
        {
          field: "hospital",
          headerName: "Nom Hopital",
          editable: true,
          width: 150,
          type: "string"  
        },
        {
            field: "bloodBank",
            type: "string",
            width: 100,
            headerName: "Groupe Sanguin"
        },
        {
            type: "string",
            headerName: "Rhésus",
            field: "rhesus",
            width: 100
        },
        {
            field: "status",
            headerName: "Statut",
            width: 120
        }
    ]

    return (
        <Paper sx={{
            height: 500,
            width: "99%"
        }}>
            <DataGrid
                columns={columns}


            />

        </Paper>
    )
}

export default DataTableOrders