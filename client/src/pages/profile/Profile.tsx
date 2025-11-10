import React, { Profiler, useContext, useState } from "react";
import "./profile.scss";
import BloodCard from "../../components/bloodCard/BloodCard";
import { bloodBankList } from "../../dummydata";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = function () {
    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()
    const  [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const handleUpdatePage = function () {
        navigate(`/profileUpdatePage/${currentUser?._id}`)
        window.location.reload()
    }

    const handleLogout = async function () {
        setError("")
        setIsFetching(true)
        try {
            const res = await fetch(`${apiUrl}/auth/logout`, {
                method: "POST",
                cache: "no-store",
                credentials: 'include',
            })

            if (res.ok) {
                const data = await res.json()
                updateUser(null)
                navigate("/")
            }
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(true)
        }
    }

    return (
        <div className="profile">

            <div className="profileContainer">
                <div className="person">

                    <div className="wrapper">

                        <div className="avatar">
                            <div className="imgContainer">
                                <img src={currentUser?.avatarUrl || "/images/noavatar.jpg"} alt="Photo de profil" />

                            </div>
                            <h3 className="avatarName">{currentUser?.username}</h3>
                            <p className="avatarEmail">{currentUser?.email}</p>
                            <button onClick={handleLogout} className="disconnect">Déconnexion</button>


                        </div>

                        <div className="personDetails">

                            <form  >

                                <div className="formTitle">Infos Utilisateur</div>
                                
                                <div className="formItem">
                                    <label htmlFor="usernamme">Nom</label>
                                    <input defaultValue={currentUser?.username} type="text" id="username" name="username" />
                                </div>

                                <div className="formItem">
                                    <label htmlFor="usernamme">Email</label>
                                    <input defaultValue={currentUser?.email} type="text" id="email" name="email" />
                                </div>

                                <div className="formItem">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input defaultValue={currentUser?.password} type="password" id="password" name="password" />
                                </div>



                            </form>

                            <button className="update" onClick={handleUpdatePage}>Modifier le profil</button>

                        </div>
                    </div>
                </div>
                <div className="orders">

                    <div className="ordersTitle">Mes commandes</div>

                    <div className="ordersList">
                        {bloodBankList.map(function(item){
                            return (
                                <BloodCard item={item} key={item.id}/>
                            )
                        })}
                    </div>

                </div>
                
            </div>
            

        </div>
    )
}

export default Profile