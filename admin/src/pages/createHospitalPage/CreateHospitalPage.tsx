import React, { useRef, useState } from "react";
import "./createHospitalPage.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const CreateHospitalPage = function () {

    const [error, setError] = useState("")
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement | null>(null)
    const [image, setImage] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")

    const handleCreateHospital = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e?.currentTarget)

        const name = String(formData.get("name"))?.trim()
        const city = String(formData.get("city"))?.trim()
        const address = String(formData.get("address"))?.trim()
        const lat = String(formData.get("lat"))?.trim()
        const lng = String(formData.get("lng"))?.trim()
        const phone = String(formData.get("phone"))?.trim()


        try {

            const res = await fetch(`${apiUrl}/api/hospitals`,  {
                method: "POST",
                cache: "no-store",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8",
                },
                body: JSON.stringify({name, address, city, lat, lng, phone, avatarUrl:image})
            })

            if (res.ok) {

                const data = await res.json()
                console.log(data)
                toast.success("Hopital crée avec succès", {
                    hideProgressBar: false,
                    closeOnClick: true,
                    autoClose: 3000,
                    draggable: true,
                })

                formRef?.current?.reset()
                setImage("")
            }


            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsCreating(false)
        }
    }

    if (isCreating) {
        return (
            <div>
                Création de l'hopital en cours...
            </div>
        )
    }
    return (
        <div className="createHospitalPage">

            <div className="createPageContainer">

                <div className="createContainer">
                    <h1>Création d'un hopital</h1>

                    <div className="wrapper">

                        <form  className="form" ref={formRef} onSubmit={handleCreateHospital}>
                            <div className="formItem">
                                <label htmlFor="name" id="name">Nom hopital</label>
                                <input type="text" id="name" name="name" placeholder="Nom de l'hopital" />
                            </div>

                            <div className="formItem">
                                <label htmlFor="city" id="city">Ville hopital</label>
                                <input type="text" id="city" name="city" placeholder="La ville de l'hopital" />
                            </div>

                            <div className="formItem">
                                <label htmlFor="address" id="address">Addresse hopital</label>
                                <input type="text" id="address" name="address" placeholder="Addresse de l'hopital"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="lat" id="lat">Latitude hopital</label>
                                <input type="text" id="lat" name="lat" placeholder="Latitude de l'hopital" />
                            </div>

                            
                            <div className="formItem">
                                <label htmlFor="lng" id="lng">Longitude hopital</label>
                                <input type="text" id="lng" name="lng" placeholder="Longitude de l'hospital"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="phone" id="phone">Numero téléphone</label>
                                <input type="text" id="phone" name="phone" placeholder="Numéro de telephone de l'hopital"  />
                            </div>

                            <div className="formItem">
                                <button type="submit"  className="createHospitalButton">Créer l'hopital</button>
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
                            multiple:true,
                            maxImageFileSize: 3000000
                        }}
                        setImage={setImage}
                    />
                </div>

            </div>


        </div>
    )
}

export default CreateHospitalPage