"use client"
import React, { FormEvent, useState } from "react"
import styles from "./page.module.scss"
import PopUpBox from "@/app/components/popUp/popUp"
import { createBadges } from "./addbadges"

export default function makeAuctionItem() {
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")
    const popUpLengthMilliSeconds = 5000

    const delay = (ms:number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    async function sendFormData(e: FormData) {
         const response = await createBadges()
        if (response == true) {
            alertBox("Det funket :)")
        }
        else {
            alertBox("Det funket ikke. vent litt og prøv igjen")
        }
    }


    async function alertBox(alertText: string) {
        SetPopUpText(alertText)
        SetPopUpOn(true)
        await delay(popUpLengthMilliSeconds);
        SetPopUpOn(false)
        SetPopUpText("")
    }

    return (
        <div className={styles.mainDiv}>
            <form action={(e) => sendFormData(e)}>
                <div className={`${styles.inputBoxes} ${styles.buttonBox}`}>
                    <button type="submit">Send inn</button>
                    <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
                </div>
            </form>
        </div >
    )
}