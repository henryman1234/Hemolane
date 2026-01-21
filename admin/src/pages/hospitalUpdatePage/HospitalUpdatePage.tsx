import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./hospitalUpdatePage.scss";
import { toast } from "react-toastify";
import UploadWidget from "../../components/uploadWidget/UploadWidget";


type HospitalDataType = {
    [key: string]: any
}

const HospitalUpdatePage = function () {

    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [currentHospital, setCurrentHospital] = useState<HospitalDataType>({})
    const [hospitalData, setHospitalData] = useState<HospitalDataType>({})
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement | null>(null)
    const [image, setImage] = useState<string | undefined>("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const  {id} = useParams()

    // First we find the currentHospital using the API
    useEffect(function() {
        try {
            setError("")
            setIsFetching(true)
            const fetchCurrentHospital = async function () {
                const res = await fetch(`${apiUrl}/api/hospitals/${id}`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    },
                })

                
                if (res.ok) {
                    const data = await res.json()
                    console.log("data",data)
                    setCurrentHospital(data?.data)
                    setHospitalData(data?.data)
                    // setImage(data.data.avatarUrl)
                }
            }


            fetchCurrentHospital()
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }
    },[])

    // Change the inputs
    const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        const {value, name} = e.target
        setCurrentHospital(function(prev) {
            return {...prev, [name]: value}
        })
    }


    // Submit the data
    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()


        const dataToUpdate  = Object.keys(currentHospital).reduce(function(acc: Record<string, string>, key: string){
            if (currentHospital[key] !== hospitalData[key] && currentHospital[key] !== "") {
                acc[key] = currentHospital[key]
            }
            return acc

        }, {})

        if (image && image !== hospitalData?.avatarUrl) {
            dataToUpdate.avatarUrl = image
        }

        try {

            const res = await fetch(`${apiUrl}/api/hospitals/${id}`, {
                method: "PUT",
                body: JSON.stringify(dataToUpdate),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8"
                },
                credentials: "include",
                
            })

            if (res.ok) {
                const data = await res.json()
                navigate(`/hospitals/${id}`)
            }
            
        } catch (err: any) {
            setError(err?.message)
        }
    }


    return (
        <div className="createHospitalPage">

            <div className="createPageContainer">

                <div className="createContainer">
                    <h1>Modifier l'Hopital</h1>

                    <div className="wrapper">

                        <form onSubmit={handleSubmit}  className="form" ref={formRef}>

                            <div className="formItem">
                                <label htmlFor="name" id="name">Nom hopital</label>
                                <input value={currentHospital?.name} type="text" id="name" name="name" placeholder="Nom de l'hopital" onChange={handleChange}/>
                            </div>

                            <div className="formItem">
                                <label htmlFor="city" id="city">Ville hopital</label>
                                <input value={currentHospital?.city} type="text" id="city" name="city" placeholder="La ville de l'hopital" onChange={handleChange}/>
                            </div>

                            <div className="formItem">
                                <label htmlFor="address" id="address">Addresse hopital</label>
                                <input value={currentHospital?.address} type="text" id="address" name="address" placeholder="Addresse de l'hopital" onChange={handleChange} />
                            </div>

                            <div className="formItem">
                                <label  htmlFor="lat" id="lat">Latitude hopital</label>
                                <input value={currentHospital?.lat} type="text" id="lat" name="lat" placeholder="Latitude de l'hopital" onChange={handleChange}/>
                            </div>

                            
                            <div className="formItem">
                                <label htmlFor="lng" id="lng">Longitude hopital</label>
                                <input value={currentHospital?.lng} type="text" id="lng" name="lng" placeholder="Longitude de l'hospital"onChange={handleChange}  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="phone1" id="phone1">Premier numéro de téléphone </label>
                                <input value={currentHospital?.phone1} type="text" id="phone1" name="phone1" placeholder="Numéro de telephone de l'hopital"  onChange={handleChange}/>
                            </div>

                            <div className="formItem">
                                <label htmlFor="phone2" id="phone2">Second numéro de téléphone</label>
                                <input value={currentHospital?.phone2} type="text" id="phone2" name="phone2" placeholder="Numéro de telephone de l'hopital" onChange={handleChange} />
                            </div>

                            <div className="formItem">
                                <button type="submit"  className="createHospitalButton">Modifier l'hopital</button>
                            </div>

                        </form>

                    </div>
                </div>

                <div className="sideContainer">
                    <div className="text">
                        Uploader des images
                    </div>

                    {image ? <img className="hospitalImage" src={image} alt="Image de l'hopital"/> : <></>}

                    <UploadWidget
                        uwConfig={{
                            cloudName: "dkeedx8l1",
                            uploadPreset: "Hemolane",
                            multiple: false,
                            maxImageFileSize: 3000000
                        }}
                        setImage={setImage}
                    />
                </div>

            </div>


        </div>
    )
}

export default HospitalUpdatePage