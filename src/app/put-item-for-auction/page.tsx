"use client"
import getUserID from "@/app/api/auth/getUserId"
import React, { useState } from "react"
import { createAuctionItemFromForm } from "../components/createAuctionItemFromForm"
import ImageFromFileName from "../components/pictureServerComponents/getImgFromNameComponent"
import ImageUploaderButton from "../components/pictureServerComponents/uploadButton"
import style from "./style.module.scss"
import PopUpBox from "@/app/components/popUp/popUp"
import { AuctionItemCard } from "../components/auction-item-card/AuctionItemCard"
import { AuksjonsObjekt } from "@prisma/client";

type AuksjonsObjectWithPrice = AuksjonsObjekt & { currentPrice: number }


export default function MakeAuctionItem() {
    const [uploadedFileName, setUploadedFileName] = useState('default.jpeg');
    const [popUpOn, SetPopUpOn] = useState(false)
    const [popUpText, SetPopUpText] = useState("")
    const popUpLengthMilliSeconds = 5000


    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('0');

    const dateNow = new Date(Date.now())
    const preViewItem: AuksjonsObjectWithPrice = {
        id: 0,
        currentPrice: (price !== "") ? parseInt(price) : 0,
        startPrice: (price !== "") ? parseInt(price) : 0,
        authorId: "a",
        approved: true,
        committee: "NOTCOM",
        currentSaleTime: dateNow,
        description: "",
        finalSaleTime: dateNow,
        imageName: uploadedFileName,
        name: itemName,
        stock: 1,
        type: "AUKSJON"
    }


    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    async function sendFormData(e: FormData) {
        if ((((typeof (e.get("name")) === "string")) == false) || (e.get("name") == "")) {
            alertBox("Ser ut som du mangler et navn")
            return;
        }
        const userId = await getUserID()
        if (!userId) {
            alertBox("Ser ut som du ikke er logget inn")
            return;

        }
        if (!((typeof (e.get("descripton")) === "string")) || (e.get("descripton") == "")) {
            alertBox("Ser ut som du mangler en beskrivelse")
            return;
        }
        if (!(typeof (parseInt(e.get("startPriceInKroner") as string)) === "number") || ((e.get("startPriceInKroner") as string) == "") || parseInt(e.get("startPriceInKroner") as string) < 0) {
            alertBox("Ser ut som du ikke skrev inn et gylding nummmer")
            return;
        }

        e.append("imageFileName", uploadedFileName)
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
            <div className={style.inputSection}>
                <form action={(e) => sendFormData(e)}>
                    <div className={style.inputBoxes}>
                        <input onChange={(e) => (setItemName(e.target.value))} name="name" required></input>
                        <label htlm-for="name">Navn på salgsobjekt</label>
                    </div>
                    <div className={`${style.inputBoxes} ${style.descriptionBox}`}>
                        <textarea rows={20} cols={20} name="descripton" required></textarea>
                        <label htlm-for="descripton">Beskrivelse</label>
                    </div>
                    <div className={style.inputBoxes} >
                        <input onChange={(e) => (setPrice(e.target.value))} name="startPriceInKroner" type="number" step="any" required></input>
                        <label htmlFor="startPriceInKroner">Start pris</label>
                    </div>
                    <div className={`${style.inputBoxes} ${style.buttonBox}`}>
                        <button type="submit">Send inn</button>
                        <PopUpBox text={popUpText} isActive={popUpOn}></PopUpBox>
                    </div>
                </form>
                <div className={style.uploaderDiv}>

                    <h2>Last opp egendefinert bilde (maks 10MB)</h2>
                    <br />
                    <p><b>Merk!</b> Noen ganger kommer ikke bildet frem til serverene våre når du trykker "last opp". Hvis bildet ikke vises etter noen sekunder, så kan du prøve å trykke last opp på nytt. Hvis du ikke ser bildet ditt, havner det ikke på veven</p>
                    <ImageUploaderButton styleNameBrowse={style.borwseButton} styleNameButton={style.uploaderButton} setUploadedFileName={setUploadedFileName} />
                </div>
            </div>
            <div className={style.cardContainer}>
                <AuctionItemCard auctionItem={preViewItem} preViewMode={true}></AuctionItemCard>
            </div>
        </div >
    )
}

