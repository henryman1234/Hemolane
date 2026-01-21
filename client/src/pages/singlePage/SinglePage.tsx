import React, { useState, useEffect, useContext } from "react"
import "./singlePage.scss";
import { singlePostData } from "../../dummydata";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "../../components/slider/Slider";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2"

interface BloodBankType {
    _id: string,
    type: string,
    desc: string,
    rhesus: string,
    name: string,
    status: string,
    image: Array<string>,
    hospital: {
        name: string,
        _id: string
        address: string,
        lat?: number,
        lng?: number,
        city: string,
        avatarUrl?: string
    }

}

const SinglePage = function () {
    
    const {id} = useParams()
    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const  [bloodBank, setBloodBank] = useState<BloodBankType | null>(null)
    const {currentUser, updateUser} = useContext(AuthContext) as AuthContextType
    const location = useLocation()
    const pathname = location.pathname
    const [userSavelist, setUserSavelist] = useState<BloodBankType[] | null>(null)

    

    useEffect(function() {
        const handleSingleBloodBank = async function () {
            try {
                
                const res = await fetch(`${apiUrl}/api/bloodBanks/${id}`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    }
                })
    
                if (res.ok) {
                    const data = await res.json()
                    
                    setBloodBank(data?.data)


                }
    
            } catch (err: any) {
                setError(err?.message)
                console.log("requete echouée")
            } finally {
                setIsFetching(false)
            }
        }

        handleSingleBloodBank()
    }, [])


    console.log()



    // Remove a bloodBank from the saveList
    const handleRemoveBloodBank = async function () {
        setError("")
        setIsFetching(true)

        try {
            
            const res = await fetch(`${apiUrl}/api/users/${currentUser?._id}/remove/${bloodBank?._id}`,{
                method: "DELETE",
                credentials: "include",
                headers: {
                    Accept: "application/json; charset=utf-8 ",
                    "Content-Type": "application/json; charset=utf-8"
                },
                cache: "no-store"
            })

            if (res.ok) {

                Swal.fire({
                    title: "C'est fait!",
                    text: "Vous avez supprimer la sauvegarde",
                    icon: "success"
                });
            }

        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }

    }


    //Request to verify if the user has already an bloodBank on his savelist array
    useEffect(function(){
        setIsFetching(true)

        const handleVerifyUserSavelist = async function () {
            try {
                const res = await fetch(`${apiUrl}/api/users/${currentUser?._id}/saveList`,{
                    method: "GET",
                    cache: "no-store",
                    credentials: "include",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    }
                })
    
                if (res.ok) {
                    const data = await res.json()
                    console.log(data)
                    setUserSavelist(data?.data)
                }

            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }
        }

        

        handleVerifyUserSavelist()




    }, [])

    const verify = function (id: string | undefined) {
        if (userSavelist) {
            for (let item of userSavelist) {
                if (item?._id === id) {
                    return true
                }
                return false
            }
        }

    }

    const handleNavigate = function () {
        navigate(`/${id}/orders/${bloodBank?.hospital?._id}`)
    }




    if (isFetching) {
        return (
            <div>...Chargement</div>
        )
    }



    return (
        <div className="singlePage">
            <div className="singlePageContainer">

                <div className="details">
                   <div className="wrapper">
                <ToastContainer/>

                    
                        <Slider images={singlePostData?.images}/>

                        <div className="info">

                            <div className="top">

                                <div className="post">
                                    <h1>{bloodBank?.name}</h1>
                                    <div className="address">
                                        <img src="/images/pin.png" alt="" />
                                        <span>{bloodBank?.hospital?.address}</span>
                                    </div>
                                    <div className="price">{`Sang ${bloodBank?.type}`}</div>
                                </div>

                                <div className="user">
                                    <img src={bloodBank?.hospital?.avatarUrl ||"/images/hopital.jpg" } alt="" />
                                    <span>{bloodBank?.hospital?.name}</span>
                                </div>
                            </div>

                            <div className="bottom">
                                {bloodBank?.desc}
                            </div>
                        </div>
                   </div>
                </div>

                <div className="features">
                    <div className="wrapper">
                        <p className="title">Infos Générales</p>
                        <div className="listVertical">

                            <div className="feature">
                                <img src="/images/utility.png" alt="" />
                                <div className="featureText">
                                    <span>Groupe sanguin</span>
                                    <p>le sang est de groupe <strong>{bloodBank?.type}</strong></p>
                                </div>
                            </div>

                            <div className="feature">
                                <img src="/images/utility.png" alt="" />
                                <div className="featureText">
                                    <span>Rhésus</span>
                                    <p>le rhésus est <strong>{bloodBank?.rhesus}</strong></p>
                                </div>
                            </div>

                            <div className="feature">
                                <img src="/images/utility.png" alt="" />
                                <div className="featureText">
                                    <span>Tests et dépistage</span>
                                    <p>La banque est vérifiéé</p>
                                </div>
                            </div>

                        </div>

                        {verify(bloodBank?._id) && <p className="title">Supprimer la sauvegarde</p>}

                        {verify(bloodBank?._id) && <button onClick={handleRemoveBloodBank} className="saveRemove">Retirer la sauvegarde</button>}

                        <p className="title">Commander la banque</p>

                        <div  className="textCommand">
                            {/* <textarea placeholder="Ecrivez le message de votre commande" required minLength={20} name="message"></textarea> */}
                            <button onClick={handleNavigate} >Commander</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SinglePage