//Ja denne koden er dårlig/ikke etter reglene
"use client"
import React, { FormEvent } from "react"
import { createAuctionItemFromForm } from "../../components/createAuctionItem"

export default function makeAuctionItem() {
    async function sendAndGetFeedback(e:FormData){
        const response = await createAuctionItemFromForm(e)
        if (response==1){
            alert("Evertyhing works")
        }
        else{
            alert("Something went wrong")
            alert(response.toString())
            alert(typeof (e.get("startPris")))
            alert(typeof (e.get("name")))
            alert(typeof (e.get("descripton")))
        }
    }


    return (
        <form action={(e) => sendAndGetFeedback(e)}>
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