import React, { useState, useEffect } from "react"
import "./singlePage.scss";
import { singlePostData } from "../../dummydata";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../../components/slider/Slider";

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
        address: string,
        lat?: number,
        lng?: number,
        city: string
    }

}

const SinglePage = function () {
    
    const {id} = useParams()
    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const  [bloodBank, setBloodBank] = useState({})

    

    useEffect(function() {
        const handleSingleBloodBank = async function () {
            try {
                
                const res = await fetch(`${apiUrl}/bloodBanks/${id}`, {
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
                    console.log(data)
                }
    
            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }
        }

        handleSingleBloodBank()
    }, [])

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
                                    <img src="/images/3.jpeg" alt="" />
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
                                    <p>le sang est de groupe <strong>{bloodBank.type}</strong></p>
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

                        <p className="title">Commander la banque</p>

                        <form method="GET" className="textCommand">
                            <textarea placeholder="Ecrivez le message de votre commande" required minLength={20} name="message"></textarea>
                            <button>Commander</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SinglePage