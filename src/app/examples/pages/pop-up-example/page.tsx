"use client"
import React, { FormEvent, useState } from "react"
import PopUpBox from "@/app/components/popUp/popUp"
import "./style.css"
export default function makeAuctionItem() {
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    async function buttonFunction() {
        alertBox("dette er en test popup")
    }

    async function alertBox(alertText: string) {
        SetPopUpText(alertText)
        SetPopUpOn(true)
        await delay(5000);
        SetPopUpOn(false)
        SetPopUpText("")
    }


    return (
        <div id="mainDiv">
            <button onClick={buttonFunction}>TestPopUp</button>
            <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
        </div >
    )
}