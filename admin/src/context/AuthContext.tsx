import React, { useState, useEffect, createContext } from "react"

type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    avatarUrl?: string
}

export type AuthContextType = {
    currentUser: User | null,
    updateUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType| null>(null)

export const AuthContextProvider =  function ({children}: {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState(function () {
        const storedUser = window.localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) as User : null
    })

    const updateUser = function (user: User | null) {
        setCurrentUser (user)
    }
    
    useEffect(function() {
        window.localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}