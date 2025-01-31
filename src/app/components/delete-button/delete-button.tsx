"use client"
import React, { FormEvent, useState } from "react"
import styles from "./style.module.scss"
import { prisma } from "../../prisma"
import { deleteFunc } from "./deleteAuctionItem"
import PopUpBox from "@/app/components/popUp/popUp"

export default function deleteButton({ objectId }: { objectId: number }) {
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")
    const popUpLengthMilliSeconds = 5000

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    
    
    async function sendDelete() {
        let response = await deleteFunc(objectId)
        if (response[1]) {
            alertBox("It worked")
        }
        else {
            alertBox("it no work")
        }
        console.log(response[0])
    }
    async function alertBox(alertText: string) {
        SetPopUpText(alertText)
        SetPopUpOn(true)
        await delay(popUpLengthMilliSeconds);
        SetPopUpOn(false)
        SetPopUpText("")
    }

    return (
        <div className={styles.buttDiv}>
            <button className={styles.delteButton} onClick={sendDelete} id="deleteButton">Slett</button>
            <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
        </div >
    )
}