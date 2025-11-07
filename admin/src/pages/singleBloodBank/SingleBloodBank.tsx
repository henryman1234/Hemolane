import React from "react";
import "./singleBloodBank.scss";
import { useParams } from "react-router-dom";

const SingleBloodBank = function () {

    const {id} = useParams()
    return (
        <div className="singleBloodBank">
            Banque de sang {id}
        </div>
    )
}

export default SingleBloodBank