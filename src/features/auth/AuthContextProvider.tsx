import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "./AuthContext"
import { useDispatch } from "react-redux";
import { fetchChatroomsByUserId } from "../chatrooms/chatroomActions";
import store, { AppDispatch, } from "../../store";
import { persistStore } from "redux-persist";
import { clearChatrooms } from "../chatrooms/chatroomsSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<User | null>(null)
    const persistor = persistStore(store)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("User state: ", currentUser)
            if (currentUser) {
                dispatch(fetchChatroomsByUserId(currentUser.uid));
            } else if (!currentUser) {
                persistor.purge()
                dispatch(clearChatrooms())
            }
        })
        return () => unsubscribe()
    }, [dispatch, persistor])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}