import React, { useState } from "react"

export const useToggle = function (initial:boolean=false) {
    const [state, setState] = useState<boolean>(initial)
    const toggle = function () {
        setState(function(prev){
            return !prev
        })
    }
    return [state, toggle]
}