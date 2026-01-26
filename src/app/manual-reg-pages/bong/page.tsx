"use client";
import React, { useState, useEffect } from "react";
import style from "./page.module.scss"
import is_miniadmin from "@/app/components/is-miniadmin/is-miniadmin"
import increment_manual_money_registration from "@/app/components/manual-money-registration-component/manual-money-registration-component"



async function placeBong(setBongsSold: React.Dispatch<React.SetStateAction<number>>) {
    const bongName = "drinkingbong"
    const moneyMadeFromBong = 30
    const response = await increment_manual_money_registration(bongName,moneyMadeFromBong)
    if (!response){
        alert("noe gikk galt! prøv igjen")
        return;
    }
    setBongsSold(response.amountSold)
}

export default function App() {
    const [loadminiadminPage, setloadminiadminPage] = useState(false);
    const [bongsSold, setBongsSold] = useState(0);

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
                <h1 className={style.title}> Dere har solgt {bongsSold} drikkebonger! Forsett sånn!</h1>
                <br></br>
                <div className={style.buttonHolder}>
                <button className={style.bongBtn} onClick={e => placeBong(setBongsSold)}>Noen har kjøpt bong</button>
                </div>

                <h1><b>!MERK!</b> bare for statestikk! Må ikke brukes for ekte pengehåndtering</h1>
            </div>
        );
    }
    return (<p>Du har ikke tilgang</p>)
}
