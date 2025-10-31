import React from "react"
import "./singlePage.scss";
import Slider from "../slider/Slider";
import { singlePostData } from "../../dummydata";

const SinglePage = function () {
    return (
        <div className="singlePage">
            <div className="singlePageContainer">

                <div className="details">
                   <div className="wrapper">
                    
                        <Slider images={singlePostData?.images}/>

                        <div className="info">

                            <div className="top">

                                <div className="post">
                                    <h1>{singlePostData.name}</h1>
                                    <div className="address">
                                        <img src="/images/pin.png" alt="" />
                                        <span>{singlePostData.address}</span>
                                    </div>
                                    <div className="price">{singlePostData.price} XAF</div>
                                </div>

                                <div className="user">
                                    <img src="/images/3.jpeg" alt="" />
                                    <span>Hopital Efoulan</span>
                                </div>
                            </div>

                            <div className="bottom">
                                {singlePostData.description}
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
                                    <p>le sang est de groupe <strong>AB+</strong></p>
                                </div>
                            </div>

                            <div className="feature">
                                <img src="/images/utility.png" alt="" />
                                <div className="featureText">
                                    <span>Rhésus</span>
                                    <p>le rhésus est <strong>Positif</strong></p>
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