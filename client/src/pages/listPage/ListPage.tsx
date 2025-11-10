import React, { useEffect, useState } from "react";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import { bloodBankList } from "../../dummydata";
import BloodCard from "../../components/bloodCard/BloodCard";
import Map from "../../components/map/Map";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../components/loaderSpinner/LoaderSpinner";

interface BloodBankType {
    _id: string,
    type: string,
    desc: string,
    rhesus: string,
    name: string,
    status: string,
    image: Array<string>,
    hospital: {
        name: string,
        address: string,
        lat?: number,
        lng?: number,
        city: string
    }

}

const ListPage = function () {

    const  [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const [allBloodBanks, setAllBloodBanks] = useState([])

    useEffect(function() {
        const handleBloodBanks = async function () {
            try {
                
                const res = await fetch(`${apiUrl}/bloodBanks`, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    }
                })
    
                if (res.ok) {
                    const data = await res.json()
                    setAllBloodBanks(data?.data)
                    console.log(data)
                }
    
            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }
        }

        handleBloodBanks()
    }, [])

    if (isFetching) {
        return (
            <div>
                <LoaderSpinner />
            </div>
        )
    }



    return (
        <div className="listPage">
            <div className="listPageContainer">
                <div className="listContainer">
                    <div className="wrapper">
                        <Filter/>
                        {allBloodBanks.map(function(item: BloodBankType){
                            return (
                                <BloodCard item={item} key={item?._id} />
                            )
                        })}
                    </div>
                </div>
                <div className="mapContainer">
                    <Map items={bloodBankList}/>
                </div>
            </div>
        </div>
    )
    
}
export default ListPage