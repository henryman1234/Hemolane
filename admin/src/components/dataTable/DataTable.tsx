import React, { useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import "./dataTable.scss";
import { Link, useNavigate, useParams } from "react-router-dom";

type DataTableTypes = {
  rows: {
    id: number
    username: string ,
    status: string,
    email: string ,
    avatarUrl: string | null
  }[],

  type?: string,

  columns: GridColDef[],
}


const DataTable = function  ({rows, columns, type}: DataTableTypes) {

  const navigate = useNavigate()

  const action: GridColDef = {

      field: "actions",
      headerName: "Actions",
      editable: true,
      width: 120,
      renderCell: function (params: GridRenderCellParams) {
        return (
          <div className="actions">

            <Link to={`/users/${params?.row._id}`} className="action">
                <img className="icon" src="/images/eye.png" alt="" />
            </Link>

            <Link to={`/users/${params?.row?._id}`} className="action">
                <img  className="icon" src="/images/delete.svg" alt="" />
            </Link>

            {type &&  <Link to={`/users/${params?.row?._id}`} className="action">
                <img  className="icon" src="/images/delete.svg" alt="" />
            </Link>}
          

          </div>
        )
      }
  }


  return (
    <Paper  
      sx={{ 
        height: 500,
        width: '99%',
       }}>

      <DataGrid
        rows={rows}
        columns={[...columns, action]}
        sx={{ 
          border: 0, 
          padding: "20px"
        }}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5
            }
          }
        }}
        showToolbar
        getRowId={function(row) {
          return row._id
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 500,
            },
          }
        }}
        disableColumnFilter
        disableColumnSelector
        pageSizeOptions={[8, 10]}
        disableDensitySelector
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnSorting
        disableColumnMenu
      
      />
    </Paper>
  );
}

export default DataTable