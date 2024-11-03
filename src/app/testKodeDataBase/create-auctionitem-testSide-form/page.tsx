//Ja denne koden er dårlig/ikke etter reglene
"use client"
import React, { FormEvent } from "react"
import { createAuctionItemFromForm } from "../../components/testKodeDataBase/createAuctionItem"

export default function lagAkusjonItem() {
    async function sendOgGiTilbakemelding(e:FormData){
        const response = await createAuctionItemFromForm(e)
        if (response==1){
            alert("Alt funket")
        }
        else{
            alert("Her gikk noe galt")
            alert(response.toString())
            alert(typeof (e.get("startPris")))
            alert(typeof (e.get("name")))
            alert(typeof (e.get("descripton")))
        }
    }


    return (
        <form action={(e) => sendOgGiTilbakemelding(e)}>
            <label>
                Navn
                <input name="name"></input>
            </label>
            <label>
                Beskrivelse
                <textarea name="descripton"></textarea>
            </label>
            <label>
                Start pris
                <input name="startPris" type="number"></input>
            </label>
            <button type="submit">Send inn</button>
        </form>
    )
}