"use client"
import React, { FormEvent } from "react"
import style from "./style.module.scss"
import { createAuctionItemFromForm } from "../components/createAuctionItemFromForm"

export default function makeAuctionItem() {
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

    function alertBox(alertText: string) {
        alert(alertText)
    }

    return (
        <div className={style.mainDiv}>
            <form action={(e) => sendFormData(e)}>
                <div className={style.inputBoxes}>
                    <input name="name"></input>
                    <label htlm-for="name">Navn</label>
                </div>
                <div className={`${style.inputBoxes} ${style.descriptionBox}`}>
                    <textarea rows={20} cols={80} name="descripton"></textarea>
                    <label htlm-for="descripton">Beskrivelse</label>
                </div>
                <div className={style.inputBoxes} >
                    <input name="startPriceInKroner" type="number"></input>
                    <label htmlFor="startPriceInKroner">Start pris</label>
                </div>
                <div  className={`${style.inputBoxes} ${style.buttonBox}`}>
                    <button type="submit">Send inn</button>
                </div>
            </form>
        </div >
    )
}