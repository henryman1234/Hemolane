import "./homePage.scss";
import React from "react";

const HomePage = function () {
    return (
        <div className="homePage">
            <div className="homeContainer">
                <div className="textContainer">
                    <div className="wrapper">
                        <h1 className="bigTitle">
                            Trouvez des banques de sang n'importe quand et n'importe où
                        </h1>
                        <p>Notre startup révolutionne la recherche de banques de sang en connectant rapidement ceux qui en ont besoin avec les ressources disponibles. Grâce à une plateforme intuitive, nous facilitons l'accès aux dons de sang, en garantissant que chaque vie compte. En cas d'urgence, trouvez la banque de sang la plus proche en quelques clics!</p>

                        <form className="formData">
                            <input type="text" name="type" placeholder="Saisissez le groupe sanguin"/>
                            <button type="submit">Rechercher</button>
                        </form>

                        <div className="boxes">
                            <div className="box">
                                <h1>03+</h1>
                                <h2>Années d'expérience</h2>
                            </div>
                            <div className="box">
                                <h1>90+</h1>
                                <h2>Banques de sang</h2>
                            </div>
                            <div className="box">
                                <h1>10+</h1>
                                <h2>Hopitaux partenaires</h2>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="imgContainer">
                    <img src="/images/bg.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomePage