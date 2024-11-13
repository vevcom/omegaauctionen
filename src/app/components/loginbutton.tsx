"use client"
import styles from "./component.module.css";
import { useState } from "react";




export function Loginbtn() {
    const [loggedIn,setLoggedIn] = useState(false);
    const source = "https://omega.ntnu.no/static/479220c49c7c0b2f742d.png";

    return <a>
        <div className={styles.loginbutton} onClick={()=>{setLoggedIn(!loggedIn)}}>
            <div className={styles.imagecontainer}> <img src={source} alt="kappe"/></div>
            <div className={`${styles.logintext} old-english`}>{loggedIn? "Din bruker" : "Logg inn"}</div>
        </div>
    </a>
}