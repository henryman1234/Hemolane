import React, { Profiler } from "react";
import "./profile.scss";
import BloodCard from "../../components/bloodCard/BloodCard";
import { bloodBankList } from "../../dummydata";

const Profile = function () {
    return (
        <div className="profile">

            <div className="profileContainer">
                <div className="person">

                    <div className="wrapper">

                        <div className="avatar">
                            <div className="imgContainer">
                                <img src="/images/8.jpeg" alt="Photo de profil" />
                            </div>
                            <h3 className="avatarName">Henry Nomo</h3>
                            <p className="avatarEmail">henrynomo68@gamail.com</p>
                        </div>

                        <div className="personDetails">

                            <form >

                                <div className="formTitle">Infos Utilisateur</div>
                                
                                <div className="formItem">
                                    <label htmlFor="usernamme">Nom</label>
                                    <input type="text" id="username" name="username" />
                                </div>

                                <div className="formItem">
                                    <label htmlFor="usernamme">Email</label>
                                    <input type="text" id="email" name="email" />
                                </div>

                                <div className="formItem">
                                    <label htmlFor="usernamme">Mot de passe</label>
                                    <input type="password" id="password" name="password" />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="orders">

                    <div className="ordersTitle">Les commandes</div>

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