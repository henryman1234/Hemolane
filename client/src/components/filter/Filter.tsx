import React from "react"
import "./filter.scss";

const Filter = function () {
    return (
        <div className="filter">
           <form >
                <h1>Résultats des recherches pour <b>sang AB+</b></h1>
                <div className="formItem">
                    <label htmlFor="">Relancez la recherche</label>
                    <input type="text" placeholder="Saisissez le groupe sanguin" name="type" />
                </div>
                <button className="submitButton">Rechercher</button>
           </form>
        </div>
    )
}

export default Filter