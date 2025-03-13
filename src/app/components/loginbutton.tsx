"use client"
import { useRouter } from "next/navigation";
import getUserID from "../api/auth/getUserId";
import styles from "./components.module.scss";
import { useEffect, useState } from "react";




export function Loginbtn() {
    const [loggedIn,setLoggedIn] = useState(false);
    const source = "https://omega.ntnu.no/static/479220c49c7c0b2f742d.png";
    const router = useRouter();

    useEffect(() => {
        async function getLoggedIn() {
            const userID = await getUserID();
            if (!userID) {
                setLoggedIn(false)
                return;
            }
            setLoggedIn(true);
        }
        getLoggedIn();
    },[]);

    function handleClick() {
        if (loggedIn) {
            router.push("/userpage");
            return;
        }
        else {
            router.push("/api/auth/signin");
        }
    }

    return (
        <div className={styles.loginbutton} onClick={handleClick}>
            <div className={styles.imagecontainer}> <img src={source} alt="kappe"/></div>
            <div className={`${styles.logintext}`}>{loggedIn? "Din bruker" : "Logg inn"}</div>
        </div>
)}