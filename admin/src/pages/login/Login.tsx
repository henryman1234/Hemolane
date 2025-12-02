import React, { useState,useContext, type FormEvent } from "react"
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, type AuthContextType } from "../../context/AuthContext";

const Register = function () {

    const [isRegistring, setIsregistring] = useState<boolean>(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL
    const {updateUser, currentUser} = useContext(AuthContext) as AuthContextType


    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e?.currentTarget)

        const username = String(formData.get("username"))?.trim()
        const password = String(formData.get("password"))?.trim()

        try {
            setError("")
            setIsregistring(true)
            
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({username, password}),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8",
                }
            })

            if (res.ok) {
                const data = await res.json()
                updateUser(data?.data)
                navigate("/")
            }

        } catch (err: any) {
           setError(err?.message) 
        } finally {
            setIsregistring(false)
        }
    }

    return (
        <div className="loginPage">

            <div className="loginContainer">

                <form onSubmit={handleSubmit} className="form">

                    <div className="loginTitle">Content de vous revoir admin!</div>

                    <div className="loginItem">
                        <label htmlFor="username">Nom</label>
                        <input type="text" id="username" name="username" placeholder="Votre nom"/>
                    </div>


                    <div className="loginItem">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="text" id="password" placeholder="Votre mot de passe" name="password" />
                    </div>

                    <div className="loginItem">
                        <button className="registerButton">Se connecter</button>
                    </div>

                    <div className="loginItem">
                        <span className="switch">Si vous avez deja un compte, cliquez <Link to="/register">Ici</Link></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register