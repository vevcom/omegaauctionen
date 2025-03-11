"use client";
import React, { useState, useEffect } from "react";
import increment_bong from "../components/incrementBong/incrementBong";
import style from "./page.module.scss"
import is_miniAdmin from "../components/is-miniAdmin/is-miniAdmin";




async function placeBong(setBongsSold: React.Dispatch<React.SetStateAction<number>>) {
    const response = await increment_bong()
    if (!response){
        alert("noe gikk galt! prøv igjen")
        return;
    }
    setBongsSold(response)
}

export default function App() {
    const [loadminiAdminPage, setloadminiAdminPage] = useState(false);
    const [bongsSold, setBongsSold] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const is_admin_response = await is_miniAdmin()
            setloadminiAdminPage(is_admin_response)
        }
        fetchData();
    }, []);

    if (loadminiAdminPage) {
        return (
            <div className={style.mainDiv}>
                <h1 className={style.title}> Dere har solgt {bongsSold} bonger! Forsett sånn!</h1>
                <br></br>
                <div className={style.buttonHolder}>
                <button className={style.bongBtn} onClick={e => placeBong(setBongsSold)}>Noen har kjøpt bong</button>
                </div>
            </div>
        );
    }
    return (<p>Du har ikke tilgang</p>)
}
