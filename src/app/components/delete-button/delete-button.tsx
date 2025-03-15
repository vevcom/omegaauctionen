"use client"
import React, { FormEvent, useState } from "react"
import styles from "./style.module.scss"
import { prisma } from "../../prisma"
import { deleteFunc } from "./deleteAuctionItem"
import PopUpBox from "@/app/components/popUp/popUp"

export default function deleteButton({ objectId }: { objectId: number }) {
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")
    const popUpLength_ms = 5000

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );



    async function sendDelete() {
        const consent = confirm("Vil du fjerne godkjenningen til dette objektet?")
        if (!consent) {
            alertBox("avbryter...")
            return;
        }
        let response = await deleteFunc(objectId)
        if (response[1]) {
            alertBox("Det funket")
        }
        else {
            alertBox("Det funket ikke")
        }
        console.log(response[0])
    }
    async function alertBox(alertText: string) {
        SetPopUpText(alertText)
        SetPopUpOn(true)
        await delay(popUpLength_ms);
        SetPopUpOn(false)
        SetPopUpText("")
    }

    return (
        <div className={styles.buttDiv}>
            <button className={styles.delteButton} onClick={sendDelete} id="deleteButton">Fjern godkjenning</button>
            <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
        </div >
    )
}