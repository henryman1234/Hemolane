import React from "react"
import "./singleUser.scss";
import { useParams } from "react-router-dom";

const SingleUser = function () {

    const  {id} = useParams()

    
    return (
        <div>
            SingleUser avec l'ID {id}
        </div>
    )
}

export default  SingleUser