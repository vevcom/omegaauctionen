"use client"
import React, { FormEvent, useState } from "react"
import styles from "./styles.module.scss"
import { prisma } from "../../prisma"
import { approve } from "./approveItem"
import PopUpBox from "@/app/components/popUp/popUp"

export default function ApproveButton({ objectId }: { objectId: number }) {
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")
    const popUpLength_ms = 5000

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    async function sendApproval() {
        const consent = confirm("Vil du godkjenne til dette objektet?")
        if (!consent) {
            alertBox("avbryter...")
            return;
        }
        let response = await approve(objectId)
        if (response[1]) {
            alertBox("Godkjent")
        }
        else {
            alertBox("Noe gikk galt")
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
            <button onClick={sendApproval} className={styles.approveButton}>Godkjenn</button>
            <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
        </div >
    )
}