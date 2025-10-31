import React, { createContext, useEffect, useState } from "react";

type User = {
    username: string,
    email: string,
    password: string
}

type AuthContextType =  {
    currentUser: User | null,
    update: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = function ({children}: {children: React.ReactNode}) {

    const [currentUser, setCurrentUser] = useState<User | null> (function() {
        const storedUser = window.localStorage.getItem("user");
        return storedUser? JSON.parse(storedUser) as User : null
    })
    
    function update (data: User | null) {
        setCurrentUser(data)
    }

    useEffect(function(){
        window.localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, update}}>
            {children}
        </AuthContext.Provider>
    )
}