"use client"
import React, { FormEvent, useState } from "react"
import "./style.css"
import { createAuctionItemFromForm } from "../components/createAuctionItemFromForm"
import PopUpBox from "@/app/components/popUp/popUp"

export default function makeAuctionItem() {
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")
    const popUpLengthMilliSeconds = 5000

    const delay = ms => new Promise( // TODO: how do i fix this?
        resolve => setTimeout(resolve, ms)
    );

    async function sendFormData(e: FormData) {

        if ((typeof (parseInt(e.get("startPriceInKroner") as string)) === "number") == false) {
            alertBox("It looks like you havent typed in i valid number")
            return;
        }
        if ((((typeof (e.get("name")) === "string")) == false) || (e.get("name") == "")) {
            alertBox("It looks like youre missing a name")
            return;
        }
        if ((((typeof (e.get("descripton")) === "string")) == false) || (e.get("name") == "")) {
            alertBox("It looks like yyour missning a description")
            return;
        }

        e.append("startPriceInOre", (parseInt(e.get("startPriceInKroner") as string) * 100).toString())
        const response = await createAuctionItemFromForm(e)

        if (response == true) {
            alertBox("It worked")
        }
        else {
            alertBox("It did'nt work")
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
        <div id="mainDiv">
            <form action={(e) => sendFormData(e)}>
                <div className="inputBoxes" id="NameBox">
                    <input name="name"></input>
                    <label htlm-for="name">Navn</label>
                </div>
                <div className="inputBoxes" id="descriptionBox">
                    <textarea rows={20} cols={80} name="descripton"></textarea>
                    <label htlm-for="descripton">Beskrivelse</label>
                </div>
                <div className="inputBoxes" id="Pricebox">
                    <input name="startPriceInKroner" type="number"></input>
                    <label htmlFor="startPriceInKroner">Start pris</label>
                </div>
                <div className="inputBoxes" id="buttonBox">
                    <button type="submit">Send inn</button>
                    <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
                </div>
            </form>
        </div >
    )
}