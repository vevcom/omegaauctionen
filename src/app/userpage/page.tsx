import style from "./page.module.scss"
import getUserID from "../api/auth/getUserId";

'use client'
import { useEffect, useState } from "react";
import getUser from "../api/auth/getUser";
import { useSession } from "next-auth/react";

export function Userpage() {
    const [user, setUser] = useState<{ id: string; name?: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser(); // Await the Promise
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        }
        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h2>Profile name: {user.name || "Unknown"}</h2>
            <h1>Dine objekter: NY </h1>
        </div>
    );
}


export default function UserPageAesthetic() {
    const { data: session, status } = useSession()

    return (
        <div>
        <br></br><h3>Brukernavn: {session?.user?.name}</h3><br></br>
        <p>Email: {session?.user?.email}</p><br></br>
        <p>Auksjonsobjekter du har bydd på og bud:JA</p><br></br>
        <p>Auksjonsobjekter du har vunnet: </p><br></br>
        <img src="https://static.vecteezy.com/system/resources/previews/036/656/372/non_2x/omega-free-vector.png" width="200" height="200"></img><br></br>
        
        <br></br><p>Din status: {status}</p><br></br>
        <a href="/api/auth/signout" className="button-class">Logg ut</a>

        </div>
        
    
    );

}