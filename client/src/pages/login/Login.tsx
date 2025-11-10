import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext, type AuthContextType} from "../../context/AuthContext"

const Login = function () {
    const  [error, setError] = useState("")
    const [isLoging, setIsLoging] = useState(false)
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const  {currentUser, updateUser} = useContext(AuthContext) as AuthContextType

    const handleLogin = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e?.currentTarget)
        const username = String(formData.get("username"))?.trim()
        const password = String(formData.get("password"))?.trim()

        try {

            const res = await fetch(`${apiUrl}/auth/login`, {
                cache: "no-store",
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8"
                },
                body: JSON.stringify({username, password})
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)
                updateUser(data?.data)
                navigate("/")
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsLoging(true)
        }
    }

    return (

        <div className="loginPage">

            <div className="loginContainer">

                <form  className="form" onSubmit={handleLogin}>

                    <div className="loginTitle">Content de vous revoir</div>

                    <div className="loginItem">
                        <label htmlFor="username">Nom</label>
                        <input type="text" id="username" name="username" placeholder="Votre nom"/>
                    </div>

                    <div className="loginItem">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="text" id="password" placeholder="Votre mot de passe" name="password" />
                    </div>


                    <div className="loginItem">
                        <button className="loginButton">Se connecter</button>
                    </div>

                    <div className="loginItem">
                        
                        <span className="switch">Si vous n'avez pas un compte, cliquez <Link to="/register">Ici</Link></span>

                    </div>

                </form>
            </div>
        </div>
    )
}

export  default Login