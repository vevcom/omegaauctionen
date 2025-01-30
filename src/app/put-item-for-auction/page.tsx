"use client"
import React, { FormEvent } from "react"
import style from "./style.module.scss"
import { createAuctionItemFromForm } from "../components/createAuctionItemFromForm"
import getUserID from "@/app/api/auth/getUserId"

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
        const userId = await getUserID()
        if(userId ==false){
            alertBox("couldnt get  user ")
            return;

        }
        e.append("startPriceInOre", (parseInt(e.get("startPriceInKroner") as string) * 100).toString())
        e.append("userById", (userId).toString())
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
                <div className={style.inputBoxes} id="NameBox">
                    <input name="name"></input>
                    <label htlm-for="name">Navn</label>
                </div>
                <div className={style.inputBoxes} id="descriptionBox">
                    <textarea className={style.descriptionTextArea} rows={20} cols={80} name="descripton"></textarea>
                    <label htlm-for="descripton">Beskrivelse</label>
                </div>
                <div className={style.inputBoxes} id="Pricebox">
                    <input className={style.inputBoxContent} name="startPriceInKroner" type="number"></input>
                    <label className={style.inputBoxContent} htmlFor="startPriceInKroner">Start pris</label>
                </div>
                <div className={style.inputBoxes} id="buttonBox">
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