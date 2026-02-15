"use client";
import React, { useState, useEffect } from "react";
import style from "./page.module.scss"
import is_miniadmin from "@/app/components/is-miniadmin/is-miniadmin"
import increment_manual_money_registration from "@/app/components/manual-money-registration-component/manual-money-registration-component"



async function placeBong(setBongsSold: React.Dispatch<React.SetStateAction<number>>) {
    const trekkLoddName = "trekkLodd"
    const moneyMadeFromTrekkLodd = 25
    const response = await increment_manual_money_registration(trekkLoddName,moneyMadeFromTrekkLodd)
    if (!response){
        alert("noe gikk galt! prøv igjen")
        return;
    }
    setBongsSold(response.amountSold/moneyMadeFromTrekkLodd)
}

export default function App() {
    const [loadminiadminPage, setloadminiadminPage] = useState(false);
    const [loddSold, setLoddSold] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const is_admin_response = await is_miniadmin()
            setloadminiadminPage(is_admin_response)
        }
        fetchData();
    }, []);

    if (loadminiadminPage) {
        return (
            <div className={style.mainDiv}>
                <h1 className={style.title}> Dere har solgt {loddSold} lodd! Forsett sånn!</h1>
                <br></br>
                <div className={style.buttonHolder}>
                <button className={style.bongBtn} onClick={e => placeBong(setLoddSold)}>Noen har kjøpt lodd</button>
                </div>

                <h1><b>!MERK!</b> bare for statestikk! Må ikke brukes for ekte pengehåndtering</h1>
            </div>
        );
    }
    return (<p>Du har ikke tilgang</p>)
}
