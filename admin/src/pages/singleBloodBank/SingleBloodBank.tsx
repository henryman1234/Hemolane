import React, { useEffect, useState } from "react";
import "./singleBloodBank.scss";
import { useParams } from "react-router-dom";

const SingleBloodBank = function () {

    const {id} = useParams()
    const [error, setError] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL
    const [isFetching, setIsFetching] = useState(false)

    // First we find the currentHospital using the API
    useEffect(function() {
        try {
            setError("")
            setIsFetching(true)
            const fetchCurrentBloodBank = async function () {
                const res = await fetch(`${apiUrl}/api/bloodBanks/${id}`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    },
                })

                
                if (res.ok) {
                    const data = await res.json()
                    console.log("Details de la banque de sang",data)
                }
            }


            fetchCurrentBloodBank()
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsFetching(false)
        }
    },[])


    return (
        <div className="singleBloodBank">
            Banque de sang {id}
        </div>
    )
}

export default SingleBloodBank