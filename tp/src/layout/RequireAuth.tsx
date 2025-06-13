import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { User } from "../models/user";

export default function RequireAuth() {

    // const user = useUserContext();
    const [user, setUser] = useState<User>();
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/user/1')
            if (response.ok) {
                const data = await response.json() as User
                setUser(data)
            }
        }

        fetchData()
    }, [])


    if (!user) return <div>Chargement...</div>;

    if (user?.role !== 'administrateur') {
        return (
            <Navigate to="/not-authorized" state={{ from: location }}></Navigate>
        )
    } else {
        return (
            <Outlet />
        )
    }

}