import React from "react"
import "./loaderSpinner.scss";

interface LoaderSpinnerType {
    size?: number,
    color?: string
}

const LoaderSpinner = function () {
    return (
        <div className="loaderSpinner"/>
    )
}

export default LoaderSpinner