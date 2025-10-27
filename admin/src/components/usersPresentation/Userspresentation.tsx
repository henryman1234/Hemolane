import React, { useEffect, useState } from "react"
import "./usersPresentation.scss";
import { Link } from "react-router-dom";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip
} from "recharts"
import {FaArrowRight} from "react-icons/fa"

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

const UsersPresentations = function () {

    const [error, setError] = useState("")
    const [isFetching ,setIsFetching] = useState<boolean>(false)
    const [allUsers, setAllUsers] = useState<any[]>([])
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(function(){
        setIsFetching(true)
        const fetchAllUsers = async function () {
            try {
                const res = await fetch(`${apiUrl}/users`, {
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    },
                    method: "GET",
                    cache: "no-store",
                    credentials: "include"
                })
                
                const data = await res.json()
                console.log(data)
                setAllUsers(data?.data)
            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }
        }

        fetchAllUsers()
    },[])

    if (isFetching) {
        return( 
            <div>Chargement...</div>
        )
    }

    return (
        <div className="usersPresentation">
            <div className="usersInfo">
                <div className="title">
                    <img src="/images/user.svg" alt="" />
                    <span>Total Utilisateurs</span>
                </div>
                <h1>{allUsers.length}</h1>
                <Link to="/users">Voir tout <FaArrowRight className="icon"/></Link>
            </div>

            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={300} height={100} data={data}>
                            <Tooltip 
                                contentStyle={{border: "none", background: "transparent" }}
                                labelStyle={{display: "none"}}
                            />
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                stroke="#8884d8"
                                dataKey="pv"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <span className="percentage">+5%</span>
                    <span className="duration">Aujourd'hui</span>
                </div>
            </div>
        </div>
    )
}

export default UsersPresentations