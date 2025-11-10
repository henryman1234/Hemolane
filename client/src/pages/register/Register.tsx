import React, { useState, type FormEvent } from "react"
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

const Register = function () {

    const [isRegistring, setIsregistring] = useState<boolean>(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL


    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e?.currentTarget)

        const username = String(formData.get("username"))?.trim()
        const email = String(formData.get("email"))?.trim()
        const password = String(formData.get("password"))?.trim()
        try {
            setError("")
            setIsregistring(true)
            
            const res = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({username, email, password}),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8",
                }
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)
                navigate("/login")
            }

        } catch (err: any) {
           setError(err?.message) 
        } finally {
            setIsregistring(false)
        }
    }



    return (
        <div className="registerPage">

            <div className="registerContainer">

                <form onSubmit={handleSubmit} className="form">

                    <div className="registerTitle">Inscription</div>

                    <div className="loginItem">
                        <label htmlFor="username">Nom</label>
                        <input type="text" id="username" name="username" placeholder="Votre nom"/>
                    </div>

                    <div className="loginItem">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Votre Email" />
                    </div>

                    <div className="loginItem">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="text" id="password" placeholder="Votre mot de passe" name="password" />
                    </div>

                    <div className="loginItem">
                        <button className="registerButton">S'incrire</button>
                    </div>

                    <div className="loginItem">
                        <span className="switch">Si vous avez deja un compte, cliquez <Link to="/login">Ici</Link></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register