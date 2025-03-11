"use client";
import React, { useState, useEffect } from "react";
import style from "./page.module.scss"
import is_miniAdmin from "../components/is-miniAdmin/is-miniAdmin";
import increment_lodd_sold from "../components/incrementLoddSalg/incrementLoddSalg";




async function placeLodd(setLoddSold: React.Dispatch<React.SetStateAction<number>>,amount:number) {
    const response = await increment_lodd_sold(amount)
    if (!response){
        alert("noe gikk galt! prøv igjen")
        return;
    }
    setLoddSold(response)
}

export default function App() {
    const [loadminiAdminPage, setloadminiAdminPage] = useState(false);
    const [loddSold, setLoddSold] = useState(0);

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
                <h1 className={style.title}> Dere har solgt {loddSold} lodd! Forsett sånn!</h1>
                <br></br>
                <div className={style.buttonHolder}>
                <button className={style.bongBtn1} onClick={e => placeLodd(setLoddSold,1)}>Noen har kjøpt 1 lodd</button>
                <button className={style.bongBtn2} onClick={e => placeLodd(setLoddSold,3)}>Noen har kjøpt 3 lodd</button>
                <button className={style.bongBtn3} onClick={e => placeLodd(setLoddSold,5)}>Noen har kjøpt 5 lodd</button>
                <button className={style.bongBtn4} onClick={e => placeLodd(setLoddSold,10)}>Noen har kjøpt 10 lodd</button>
                </div>
            </div>
        );
    }
    return (<p>Du har ikke tilgang</p>)
}
