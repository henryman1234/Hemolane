import React, { useEffect, useState } from "react";
import "./singleHospital.scss";
import { useNavigate, useParams } from "react-router-dom";
import AddBloodBank from "../../components/addBloodBank/AddBloodBank";
import { toast } from "react-toastify";

interface HospitalProps {
    name: string
    address: string,
    city: string,
    lat: string,
    lng: string,
    phone1:string
    phone2 :string,
    avatarUrl?: string

}

const SingleHospital = function () {

    const {id} = useParams()
    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const  navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const [hospital, setHospital] = useState<HospitalProps | null>(null)
    const [open, setOpen] = useState(false)


    useEffect(function() {
        setError("")
        setIsFetching(true)

        const fetchHospitalDetails = async function () {
            try {

                const res = await fetch(`${apiUrl}/api/hospitals/${id}`, {
                    method: "GET",
                    cache: "no-store",
                    credentials: "include",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    }
                })
                                                                                                                                                                                                     
                if (res.ok) {
                    const data = await res.json()
                    setHospital(data?.data)
                }
                
            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }
        }

        fetchHospitalDetails()
    }, [])

    // Delete an Hopsital with his bloodBanks
    const handleDeleteHospital = async function () {

        try {

            const res = await fetch(`${apiUrl}/api/hospitals/${id}`, {
                method: "DELETE",
                cache: "no-store",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            })

            if (res.ok) {
                const data = await res.json()
                toast.warning("Hopital supprimé avec succès", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    position: "top-right"
                })
                navigate(`/hospitals`)
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }
    }

    // Go the update page
    const handleUpdate = function () {
        navigate(`/hospitalUpdatePage/${id}`)
    }

    return (
        <div className="singleHospital">
            <div className="singleHospitalContainer">

                {open && <AddBloodBank setOpen={setOpen}/>}

                <div className="item item1" style={{gridArea: "box-1"}}>

                    <div className="imgContainer">
                        <img src={hospital?.avatarUrl || "/images/hopital.jpg"} alt="" />
                    </div>

                    <div className="userInfos">

                        <div className="head">
                            <span>Nom Hopital</span>
                            <h3>{hospital?.name}</h3>
                        </div>

                        <div className="infoItem">
                            <span>Ville</span>
                            <h3>{hospital?.city}</h3>
                        </div>

                        <div className="infoItem">
                            <span>Addresse</span>
                            <h3>{hospital?.address}</h3>
                        </div>

                        <div className="infoItem">
                            <span>Latitude</span>
                            <h3>{hospital?.lat}</h3>
                        </div>

                        <div className="infoItem">
                            <span>Longitude</span>
                            <h3>{hospital?.lng}</h3>
                        </div>

                    </div>

                    <div className="buttonContainer">
                        <button onClick={function() {
                            setOpen(true)
                        }} className="createBankButton">Créer une banque</button>
                    </div>
                </div>

                <div className="item item2" style={{gridArea: "box-2"}}>
                    <div className="first">
                        <h3>Autres Infos</h3>
                        <button>Contacts</button>
                    </div>
                    <hr />
                    <div className="second">

                        <div className="first-item">
                            <div className="main">
                                <h3>Contact 1</h3>
                                <span>Numéro 1</span>
                            </div>
                            <h3 className="info">{hospital?.phone1}</h3>

                        </div>

                        <div className="second-item">
                            <div className="main">
                                <h3>Contact 2</h3>
                                <span>Numéro 2</span>
                            </div>
                            <h3 className="info">{hospital?.phone2}</h3>

                        </div>
                    </div>

                </div>

            <div className="item item3" style={{gridArea: "box-3"}}>
                <div className="first">
                    <h3>Actions possibles</h3>
                    <button>Modifier</button>
                </div>
                <hr />
                <div className="second">

                    <div className="first-item">
                        <div className="main">
                            <h3>Supprimer un hopital</h3>
                            <span>Avec toutes ses banques</span>
                        </div>
                        <button onClick={handleDeleteHospital} className="delete">Supprimer</button>

                    </div>

                    <div className="second-item">
                        <div className="main">
                            <h3>Créer une banque</h3>
                            <span>Nom Hopital</span>
                        </div>
                        <button onClick={function(){
                            setOpen(true)
                        }} className="create">créer </button>
                    </div>

                    <div className="third-item">
                        <div className="main">
                            <h3>Modifier l'hopital</h3>
                            <span>Nom Hopital</span>
                        </div>
                        <button onClick={handleUpdate} className="modify">Modifier</button>
                    </div>

                </div>
            </div>

            
        </div>
    </div>
    )
}

export default SingleHospital