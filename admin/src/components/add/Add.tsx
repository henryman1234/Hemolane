import React, { useState, type SetStateAction } from "react"
import "./add.scss";
import type { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";

interface ModalTypes {
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    item: string,
    columns: GridColDef[]
}

const Add = function (props: ModalTypes) {
    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [message, setMessage] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL

    const handleCreateHospital = async function (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError("");
        setIsFetching(true)

        const formdata = new FormData(e.currentTarget)
        const name = String(formdata.get("name"))?.trim()
        const address = formdata.get("address")
        const city = formdata.get("city")
        const lat = formdata.get("lat")
        const lng = formdata.get("lng")

        try {

            const res = await fetch(`${apiUrl}/api/hospitals`, {
                cache: "no-store",
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8"
                },
                body: JSON.stringify({name, city, address, lat, lng})
            })

            if (res.ok)  {
                const data = await res.json()
                console.log(data)
                toast.success("Hopital crée avec succès", {
                    draggable: true,
                    closeOnClick: true,
                    autoClose: 3000,
                    hideProgressBar: false
                })

                
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }
    }

    if (isFetching) {
        return (
            <div>
                Chargement en cours...
            </div>
        )
    }

    return (
        <div className="add">
            <div className="modal">
                
                <span onClick={function() {
                    props.setOpen(false)
                }} className="close">x</span>

                <h1>Ajouter un nouvel {props.item}</h1>

                <form onSubmit={handleCreateHospital}>

                    {props.columns.filter(item => item.field !== "_id" && item.field !== "avatarUrl")
                    .map(function(column){
                        return (
                            <div key={column.headerName}  className="item">
                                <label htmlFor="">{column.headerName}</label>
                                <input type="text" placeholder={column.field} name={column.field} />
                            </div>
                        )
                    })}

                    <button type="submit">Envoyer</button>

                </form>
            </div>
        </div>
    )

}

export default Add