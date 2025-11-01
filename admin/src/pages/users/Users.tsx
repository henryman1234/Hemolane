import React, { useEffect, useState } from "react";
import "./users.scss";
import DataTable from "../../components/dataTable/DataTable";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Users = function () {

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState("")
  const navigate = useNavigate
  const apiUrl = import.meta.env.VITE_API_URL
  const [users, setUsers] = useState([])


  useEffect(function(){

    const fetchAllUsers = async function () {

      try {

        const res = await fetch (`${apiUrl}/users`, {
          method: "GET",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
          cache: "no-store",
          credentials: "include"
        })
        
        if (res.ok) {
          const data = await res.json()

          setUsers(data?.data)

          toast.success("Opération réusssie", {
            position: "top-right",
            draggable: true,
            closeOnClick: true,
            autoClose: 5000,
            hideProgressBar: false
          })

          console.log(data)
        }

        
        
      } catch (err: any) {
        setError(err?.message)
      } finally {
        setIsFetching(false)
      }

    }

    fetchAllUsers()


  }, [])
  


  const style = {
    width: "35px",
    height: "35px",
    cursor: "pointer",
    borderRadius: "50%"
  }

  const columns: GridColDef[] = [
      { field: '_id', headerName: 'ID', width: 70, type:  "string" },
      {
        field: "avatarUrl",
        type: "string",
        headerName: "Image",
        editable: true,
        width: 100,
        renderCell:  function (params: GridRenderCellParams) {
          return (
            <img style={style} src={params?.value || "/images/noavatar.jpg"} alt="avatar" />
          )
        }
      },
      { field: 'username', headerName: 'Nom utilisateur', width: 130 },
      { field: 'email', headerName: 'Email', width: 130 },

      {
          field: "status",
          headerName: "Statut",
          type: "string",
          editable: true,
          width: 100
      },
      {
        field: 'nom_complet',
        headerName: 'Nom complet',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.username || ''} ${row.email || ''}`,
      },
  ];
  
  const rows = [
    {
      id: 1, username: "Henry",email: "ehh", avatarUrl: "hyhe", status: "gtgd"
    }
  ]


  if (isFetching){
    return (
      <div>Chargement...</div>
    )
  }


  return (
    <div className="users">
        
      <div className="info">
        <h1>Les utilisateurs</h1>
        <button className="add">Ajouter un utilisateur</button>
        <ToastContainer/>
      </div>

      <DataTable columns={columns} rows={users}/>


    </div>
  )
}

export default Users