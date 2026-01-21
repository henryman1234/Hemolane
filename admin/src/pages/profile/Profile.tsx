import React, { Profiler, useContext, useEffect, useState } from "react";
import "./profile.scss";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

// interface SaveListItem {
//     name: string;
//     _id: string;
//     type: string;
//     image: Array<string>;
//     desc: string;
//     rhesus: string;
//     status?: string;
//     hospital: {
//         name: string;
//         address: string;
//         lat?: number;
//         lng?: number;
//         city: string;
//     };
// }

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

    // const [saveList, setSaveList] = useState<SaveListItem[]>([])

    const location = useLocation()
    const pathname = location.pathname

    const handleLogout = async function () {
        setError("")
        setIsFetching(true)
        try {
            const res = await fetch(`${apiUrl}/api/auth/logout`, {
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

    // useEffect(function(){
    //     setError("")
    //     setIsFetching(true)
    //     const handleSaveList = async function () {

    //         try {
                
    //             const res = await fetch(`${apiUrl}/api/users/${currentUser?._id}/saveList`, {
    //                 method: "GET",
    //                 cache: "no-store",
    //                 credentials: "include",
    //                 headers: {
    //                     Accept: "application/json; charset=utf-8"
    //                 }
    //             })

    //            if (res.ok) {
    //             const data = await res.json()
    //             setSaveList(data?.data)
                
    //             console.log(data)
    //            }

    //         } catch (err: any) {
    //             setError(err?.message)
    //         } finally {
    //             setIsFetching(false)
    //         }
    //     }

    //     handleSaveList()

    // }, [])

    // const handleNavigate = function () {
    //     navigate("/reservations")
    // }

    




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
                            <div className="actionButtons">
                                {/* <button onClick={handleNavigate} className="reserve">Reserver</button> */}
                                <button onClick={handleLogout} className="disconnect">Déconnexion</button>
                            </div>


                        </div>

                        <div className="personDetails">

                            <form  >
                                <div className="formTitle">Infos Admin</div>
                                
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
                {/* <div className="orders">

                    <div className="ordersTitle">Mes sauvegardes</div>

                    <div className="ordersList">

                        {saveList.length > 0 ? saveList.map(function(item: SaveListItem){
                            return (
                                <BloodCard item={item} key={item?._id} />
                            )
                        }) : <div className="indicator">Aucune sauvegarde pour le moment</div>}
                    </div>

                </div> */}
                
            </div>
            

        </div>
    )
}

export default Profile