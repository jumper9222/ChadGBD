import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

export default function RequireAuth() {
    const currentUser = auth.currentUser;
    console.log("require auth: ", currentUser)

    if (!currentUser) return <Navigate to={'/login'} />
    else return <Outlet />
}