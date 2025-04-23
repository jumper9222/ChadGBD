import { useContext } from "react";
import { AuthContext } from "../features/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const user = useContext(AuthContext).user

    if (!user) return <Navigate to={'/login'} />
    else return <Outlet />
}