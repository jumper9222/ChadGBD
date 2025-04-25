import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, UserInfo } from "firebase/auth"
import { auth, db, provider } from "../../firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { persistStore } from "redux-persist";
import store from "../../store";
const persistor = persistStore(store);

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
}

const saveUserDetailsInDb = async ({ uid, displayName, email, photoURL }: UserInfo) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef)
    const userData = { uid, displayName, email, photoURL }
    if (!userDoc.exists()) {
        setDoc(userRef, userData)
        console.log('New user saved in database: ', userData)
    }
}

export const signupWithEmailAndPassword = async (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            console.log("User registered successfully")
            saveUserDetailsInDb(user.user)
        })
        .catch((error) => console.log('Failed to register user: ', error.message))
}

//Login using google account
export const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
        .then((user) => {
            saveUserDetailsInDb(user.user)
        })
}

export const handleLogout = async () => {
    auth.signOut()
        .then(() => {
            persistor.purge()//Purge persist state when logging out
        })
}