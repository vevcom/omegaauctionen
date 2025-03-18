"use client"
import React, { FormEvent, useEffect, useState } from "react"
import style from "./page.module.scss"
import is_miniadmin from "@/app/components/is-miniadmin/is-miniadmin"
import increment_manual_money_registration from "@/app/components/manual-money-registration-component/manual-money-registration-component"



async function sendFormData(e: FormData, setAmountSoldForOre: React.Dispatch<React.SetStateAction<number>>) {
    if (!(typeof (parseInt(e.get("startPriceInKroner") as string)) === "number") || ((e.get("startPriceInKroner") as string) == "") || parseInt(e.get("startPriceInKroner") as string) < 0) {
        alert("Ser ut som du ikke skrev inn et gylding nummmer")
        return;
    }

    const liveAuctionName = "liveAuctionMoney"
    const bidAmountInOre = parseInt((parseFloat((e.get("startPriceInKroner") as string)) * 100).toFixed(2))
    const response = await increment_manual_money_registration(liveAuctionName,bidAmountInOre)


    if (!response) {
        alert("Det funket ikke. vent litt og prøv igjen")
    }
    else {
        setAmountSoldForOre(response.moneyMade)
    }
}



export default function makeAuctionItem() {
    const [amountSoldForOre, setAmountSoldForOre] = useState(0)
    const [loadminiadminPage, setloadminiadminPage] = useState(false);

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
                <h1 className={style.title}> Dere har solgt for {amountSoldForOre / 100}kr! Forsett sånn!</h1>
                <form action={(e) => sendFormData(e, setAmountSoldForOre)}>
                    <div className={style.inputBoxes} >
                        <input name="startPriceInKroner" type="number" step="any" required></input>
                        <label htmlFor="startPriceInKroner">Pris solgt for</label>
                    </div>
                    <div className={`${style.inputBoxes} ${style.buttonBox}`}>
                        <button type="submit">Send inn</button>
                    </div>
                </form>
            </div>

        )
    }

    return (<p>Du har ikke tilgang</p>)
}