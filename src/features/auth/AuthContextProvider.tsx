import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "./AuthContext"
import { useDispatch } from "react-redux";
import { fetchChatroomsByUserId } from "../chatrooms/chatroomActions";
import store, { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { clearChatrooms } from "../chatrooms/chatroomsSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<User | null>(null)
    const chatrooms = useSelector((state: RootState) => state.chatrooms.chatrooms)
    const chatroomsRehydrated = Object.keys(chatrooms)?.length > 0
    const persistor = persistStore(store)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (user?.uid && !chatroomsRehydrated) { //Chatrooms are only fetched if they don't already exist in the redux store
                dispatch(fetchChatroomsByUserId(user.uid));
            } else if (!user) {
                persistor.purge()
                dispatch(clearChatrooms())
            }
        })
        return () => unsubscribe()
    }, [dispatch, chatroomsRehydrated, user, persistor])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}