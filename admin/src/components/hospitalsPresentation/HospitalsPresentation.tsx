import React, { useEffect, useState } from "react";
import "./hospitalsPresentation.scss";
import { Link } from "react-router-dom";
import {
    ResponsiveContainer,
    Line,
    Tooltip,
    LineChart
} from "recharts"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1390,
        amt: 2210
    },
    {
        name: "Page C",
        uv: 2333,
        pv: 3444,
        amt: 2290
    },
    {
        name: "Page D",
        uv: 2233,
        pv: 3443,
        amt: 2190
    },
    {
        name: "Page E",
        uv: 2487,
        pv: 3424,
        amt: 2290
    }
]

const HospitalsPresentation = function () {

    const [error, setError] = useState("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const [hospitals, setHospitals] = useState<any[]>([])

    useEffect(function() {
        setIsFetching(true)
        const fetchAllHospitals = async function () {
            try {

                const res = await fetch(`${apiUrl}/hospitals`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    },
                    credentials: "include",
                    cache: "no-store",

                })

                const data = await res.json()
                if (res.ok) {
                    setHospitals(data?.data)
                }
                
            } catch (err:any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }
        }
        fetchAllHospitals()
    }, [])

    if (isFetching) {
        return (
            <div>Chargement...</div>
        )
    }

    return (
        <div className="hospitalsPresentation">
            <div className="hospitalsInfo">
                <div className="title">
                    <img src="/images/product.svg" alt="Hospitals" />
                    <span>Total Hopitaux</span>
                </div>
                <h1>{hospitals.length}</h1>
                <Link to="/hospitals">Voir tout <FaArrowRight className="icon"/> </Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={300} height={100} data={data}>
                            <Tooltip
                                contentStyle={{border: "none", background: "transparent"}}
                                labelStyle={{display: "none"}}
                            />
                            <Line
                                strokeWidth={2}
                                stroke="#079FA0"
                                type="monotone"
                                dataKey="uv"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <div className="percentage">+5%</div>
                    <div className="duration">Aujourd'hui</div>
                </div>
            </div>
        </div>
    )
}

export default HospitalsPresentation