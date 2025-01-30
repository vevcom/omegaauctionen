"use client"
import React, { FormEvent, useState } from "react"
import "./style.css"
import { createAuctionItemFromForm } from "../components/createAuctionItemFromForm"
import ImageFromFileName from "../components/pictureServerComponents/getImgFormName"
import ImageUploaderButton from "../components/pictureServerComponents/uploadButton"
import {uploadImage} from "../components/pictureServerComponents/uploadImageServerFunction"

export default function makeAuctionItem() {
    const [uploadedFileName, setUploadedFileName] = useState('default.jpeg');

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
        e.append("imageFileName",uploadedFileName)
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
                </div>
            </form>
            <h1>last opp bilde</h1>
                  <ImageUploaderButton
                    uploadImage={uploadImage}
                    setUploadedFileName={setUploadedFileName}
                  />
                  {uploadedFileName && (
                    <div className="mt-4 text-green-500">
                      Uploaded File: {uploadedFileName}
                    </div>
                  )}
                  <ImageFromFileName filename={uploadedFileName}></ImageFromFileName>
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