"use client"
import React, { FormEvent } from "react"
import styles from "./putItemForAuction.module.scss"
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
        // e.append("")
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
        <div className={styles.mainDiv}>
            <form action={(e) => sendFormData(e)}>
                <div className={styles.inputBoxes} id="NameBox">
                    <input name="name"></input>
                    <label htlm-for="name">Navn</label>
                </div>
                <div className={styles.inputBoxes} id="descriptionBox">
                    <textarea className={styles.descriptionTextArea} rows={20} cols={80} name="descripton"></textarea>
                    <label htlm-for="descripton">Beskrivelse</label>
                </div>
                <div className={styles.inputBoxes} id="Pricebox">
                    <input className={styles.inputBoxContent} name="startPriceInKroner" type="number"></input>
                    <label className={styles.inputBoxContent} htmlFor="startPriceInKroner">Start pris</label>
                </div>
                <div className={styles.inputBoxes} id="buttonBox">
                    <button type="submit">Send inn</button>
                </div>
            </form>
        </div >
    )


    // async function sendAndGetFeedback(e:FormData){
    //     const response = await createAuctionItemFromForm(e)
    //     if (response==){
    //         alert("Evertyhing works")
    //     }
    //     else{
    //         alert("Something went wrong")
    //         alert(response.toString())
    //         alert(typeof (e.get("startPris")))
    //         alert(typeof (e.get("name")))
    //         alert(typeof (e.get("descripton")))
    //     }
    // }


    // return (
    //     <form action={(e) => sendAndGetFeedback(e)}>
    //         <label>
    //             Navn
    //             <input name="name"></input>
    //         </label>
    //         <label>
    //             Beskrivelse
    //             <textarea name="descripton"></textarea>
    //         </label>
    //         <label>
    //             Start pris
    //             <input name="startPris" type="number"></input>
    //         </label>
    //         <button type="submit">Send inn</button>
    //     </form>
    // )
}