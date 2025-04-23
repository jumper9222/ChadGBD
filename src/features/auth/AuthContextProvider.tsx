import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { User } from "firebase/auth";
import { AuthContext } from "./AuthContext"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        return auth.onAuthStateChanged((currentUser) => { setUser(currentUser) })
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}