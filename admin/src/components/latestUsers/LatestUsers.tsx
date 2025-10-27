import React, { useEffect, useState } from "react";
import "./latestUsers.scss";
import Avatar from "../../../public/images/noavatar.jpg"
import { useNavigate } from "react-router-dom";

const LatestUsers = function () {
    const [error, setError] = useState<string | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [success, setSuccess] = useState("")
    const [users, setUsers] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(function(){
        setIsFetching(true)
        const fetchLatestusers = async function () {
            try {
                const res = await fetch(`${apiUrl}/users`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        Accept: "application/json; charset=utf-8"
                    }
                })
                const data = await res.json()
                console.log(data?.data?.slice(-8).length)
                setUsers(data?.data?.slice(-8))
            } catch (err: any) {
                setError(err?.message)
            } finally {
                setIsFetching(false)
            }

        }
        fetchLatestusers()
    }, [])

    interface User {
        username: string,
        email: string,
        _id?: string,
        password?: string
    }


    return (
        <div className="users">
            <h1>Utilisateurs</h1>

            <div className="list">
                {users?.map(function(user: User){
                    return (
                        <div className="listItem" key={user?._id}>
                            <div className="user">
                                <img src={Avatar} alt="" />
                                <div className="userTexts">
                                    <span className="username">{user?.username}</span>
                                    <span className="email">{user?.email}</span>
                                </div>
                            </div>
                            <span className="status">actif</span>
                    </div>
                    )
                })}





                
            </div>
        </div>
    )
}

export default LatestUsers