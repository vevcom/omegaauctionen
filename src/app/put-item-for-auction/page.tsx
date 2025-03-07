"use client"
import getUserID from "@/app/api/auth/getUserId"
import React, { FormEvent, useState } from "react"
import { createAuctionItemFromForm } from "../components/createAuctionItemFromForm"
import ImageFromFileName from "../components/pictureServerComponents/getImgFromNameComponent"
import ImageUploaderButton from "../components/pictureServerComponents/uploadButton"
import style from "./style.module.scss"
import PopUpBox from "@/app/components/popUp/popUp"

export default function makeAuctionItem() {
    const [uploadedFileName, setUploadedFileName] = useState('default.jpeg');
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")
    const popUpLengthMilliSeconds = 5000

    const delay = (ms:number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    async function sendFormData(e: FormData) {
        if ((((typeof (e.get("name")) === "string")) == false) || (e.get("name") == "")) {
            alertBox("Ser ut som du mangler et navn")
            return;
        }
        const userId = await getUserID()
        if(userId ==false){
            alertBox("couldnt get  user ")
            return;

        }
        if ((((typeof (e.get("descripton")) === "string")) == false) || (e.get("descripton") == "")) {
            alertBox("Ser ut som du mengler en beskrivelse")
            return;
        }
        if (((typeof (parseInt(e.get("startPriceInKroner") as string)) === "number") == false) || ((e.get("startPriceInKroner") as string) == "")|| (parseInt(e.get("startPriceInKroner") as string)<0)) {
            alertBox("Ser ut som du ikke skrev inn et gylding nummmer")
            return;
        }
        e.append("imageFileName", uploadedFileName)
        e.append("startPriceInOre", (parseInt(e.get("startPriceInKroner") as string) * 100).toString())
        e.append("userById", (userId).toString())
        const response = await createAuctionItemFromForm(e)

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
        <div className={style.mainDiv}>
            <form action={(e) => sendFormData(e)}>
                <div className={style.inputBoxes}>
                    <input name="name"></input>
                    <label htlm-for="name">Navn på salgsobjekt</label>
                </div>
                <div className={`${style.inputBoxes} ${style.descriptionBox}`}>
                    <textarea rows={20} cols={80} name="descripton"></textarea>
                    <label htlm-for="descripton">Beskrivelse</label>
                </div>
                <div className={style.inputBoxes} >
                    <input name="startPriceInKroner" type="number"></input>
                    <label htmlFor="startPriceInKroner">Start pris</label>
                </div>
                <div className={`${style.inputBoxes} ${style.buttonBox}`}>
                    <button type="submit">Send inn</button>
                    <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
                </div>
            </form>
            <h1>Last opp egendefinert bilde.</h1>
            <ImageUploaderButton
                setUploadedFileName={setUploadedFileName}
            />
            <ImageFromFileName styleComponent={style} filename={uploadedFileName}></ImageFromFileName>
        </div >
    )
}