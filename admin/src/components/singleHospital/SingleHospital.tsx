import React from "react";
import "./singleHospital.scss";
import { useParams } from "react-router-dom";

const SingleHospital = function () {

    const {id} = useParams()

    return (
        <div className="singleHospital">
            Hopital {id}
        </div>
    )
}

export default SingleHospital