"use client"
import React, { FormEvent, useEffect, useState } from "react"
import style from "./page.module.scss"
import increment_LiveAuctionStats from "../components/incrementLiveAuctionStats/incrementLiveAuctionStats"
import is_miniAdmin from "../components/is-miniAdmin/is-miniAdmin"



async function sendFormData(e: FormData, setAmountSoldForOre: React.Dispatch<React.SetStateAction<number>>) {
    if (!(typeof (parseInt(e.get("startPriceInKroner") as string)) === "number") || ((e.get("startPriceInKroner") as string) == "") || parseInt(e.get("startPriceInKroner") as string) < 0) {
        alert("Ser ut som du ikke skrev inn et gylding nummmer")
        return;
    }

    const bidAmountInOre = parseInt((parseFloat((e.get("startPriceInKroner") as string)) * 100).toFixed(2))
    const response = await increment_LiveAuctionStats(bidAmountInOre)


    if (!response) {
        alert("Det funket ikke. vent litt og prøv igjen")
    }
    else {
        setAmountSoldForOre(response)
    }
}



export default function makeAuctionItem() {
    const [amountSoldForOre, setAmountSoldForOre] = useState(0)
    const [loadminiAdminPage, setloadminiAdminPage] = useState(false);

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