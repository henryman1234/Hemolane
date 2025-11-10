import React, { useContext, useEffect, useState } from "react"
import "./profileUpdatePage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const ProfileUpdatePage = function () {

    type UserDataType = {
        [key: string]: any
    }

    const {id} = useParams()
    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()
    const [userData, setUserData] = useState<UserDataType>({})
    const [formInputs, setFormInputs] = useState<UserDataType>({})
    const [error, setError] = useState("")
    const [fetching, setIsFetching] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const [image, setImage] = useState(currentUser?.avatarUrl)

    // First we find the currentuser using the API
    useEffect(function() {
        try {
            setError("")
            setIsFetching(true)
            const fetchCurrentUser = async function () {
                const res = await fetch(`${apiUrl}/users/${currentUser?._id}`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    },
                })

                
                if (res.ok) {
                    const data = await res.json()
                    console.log(data)
                    setUserData(data?.data)
                    setFormInputs(data?.data)
                    
                }
            }

            fetchCurrentUser()

            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }
    },[])

    // Change the inputs
    const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
        const {value, name} = e.target
        setFormInputs(function(prev) {
            return {...prev, [name]: value}
        })
    }

    // Submit the data
    const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()


        const dataToUpdate  = Object.keys(formInputs).reduce(function(acc: Record<string, string>, key: string){
            if (formInputs[key] !== userData[key] && formInputs[key] !== "") {
                acc[key] = formInputs[key]
            }
            return acc

        }, {})

        if (image && image !== userData?.avatarUrl) {
            dataToUpdate.avatarUrl = image
        }

        try {

            const res = await fetch(`${apiUrl}/users/${id}`, {
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
                console.log(data)
                updateUser(data?.data)
                navigate("/profile")
            }
            
        } catch (err: any) {
            setError(err?.message)
        }
    }

    return (
        <div className="profileUpdatePage">
            <div className="profileUpdateContainer">

                <div className="person">

                    <div className="wrapper">

                        <div className="avatar">
                            <div className="imgContainer">
                                <img src={image || "/images/noavatar.jpg"} alt="Photo de profil" />
                            </div>
                            <h3 className="avatarName">{currentUser?.username}</h3>
                            <p className="avatarEmail">{currentUser?.email}</p>
                        </div>

                        <div className="personDetails">

                            <form  onSubmit={handleSubmit} >

                                <div className="formTitle">Mofifiez vos infos</div>
                                
                                <div className="formItem">
                                    <label htmlFor="usernamme">Nom</label>
                                    <input onChange={handleChange} value={formInputs?.username} type="text" id="username" name="username" />
                                </div>

                                <div className="formItem">
                                    <label htmlFor="usernamme">Email</label>
                                    <input onChange={handleChange} value={formInputs?.email} type="text" id="email" name="email" />
                                </div>

                                <div className="formItem">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input onChange={handleChange} value={formInputs?.password} type="password" id="password" name="password" />
                                </div>

                                <div className="formItem">
                                    <button className="update" >Enregistrer les modifs</button>
                                </div>



                            </form>

                            

                        </div>
                    </div>
                </div>

                <div className="image">

                    <div className="widgetTitle">Choisissez une image</div>

                    <UploadWidget
                        uwConfig={{
                            uploadPreset: "HemoLane",
                            cloudName: "dkeedx8l1",
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


export default ProfileUpdatePage