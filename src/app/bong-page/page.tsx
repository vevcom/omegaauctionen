"use client";
import React, { useState, useEffect } from "react";
import is_admin from "@/app/components/is-admin/is-admin-func";
import increment_bong from "../components/incrementBong/incrementBong";
import style from "./page.module.scss"




async function placeBong(setBongsSold: React.Dispatch<React.SetStateAction<number>>) {
    const response = await increment_bong()
    if (!response){
        alert("noe gikk galt! prøv igjen")
        return;
    }
    setBongsSold(response)
}

export default function App() {
    const [loadAdminPage, setLoadAdminPage] = useState(false);
    const [bongsSold, setBongsSold] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const is_admin_response = await is_admin()
            setLoadAdminPage(is_admin_response)
        }
        fetchData();
    }, []);

    if (loadAdminPage) {
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
