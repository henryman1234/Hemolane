import React, { useState } from  "react"
import "./slider.scss";
import Image from "/images/8.jpeg"

const Slider = function ({images} ) {

    const [currentImage, setCurrentImage] = useState("")

    const handleDefine = function (index: number) {
        let newImage;
        newImage = images[index]
        setCurrentImage(newImage)
    }

    return (
        <div className="slider">
            <div className="bigImage">
                <img src={currentImage || Image} alt="Grande Image" />
            </div>
            <div className="smallImages">
                {images.map(function(image: string, index: number){
                    return (
                        <img onClick={function() {
                            handleDefine(index)
                        }} src={image} alt="Pétite image" key={index} />
                    )
                })}
            </div>
        </div>
    )
}

export default Slider