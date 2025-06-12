import { createContext, useContext, useEffect, useState, type JSX } from "react";
import type { User } from "../models/user";

const UserContext = createContext<User | null>(null)

export function UserContextProvider({ children }: { children: JSX.Element }): JSX.Element {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/user/1')
            if (response.ok) {
                const data = await response.json() as User;
                setUser(data)
            }
        }

        fetchData();
    }, [])

    if (!user) return <div>loading...</div>

    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    )

}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) throw Error('context not in scope')
    return context;
}