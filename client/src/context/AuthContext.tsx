import React, { createContext, useEffect, useState } from "react";

type User = {
    username: string,
    email: string,
    password: string,
    _id: string,
    avatarUrl?: string
}

export type AuthContextType =  {
    currentUser: User | null,
    updateUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = function ({children}: {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User | null> (function() {
        const storedUser = window.localStorage.getItem("user");
        return storedUser? JSON.parse(storedUser) as User : null
    })
    
    function updateUser (data: User | null) {
        setCurrentUser(data)
    }

    useEffect(function(){
        window.localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}