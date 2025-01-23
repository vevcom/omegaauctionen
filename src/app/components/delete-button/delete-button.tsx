"use client"
import React, { FormEvent } from "react"
import "./style.css"
import { prisma } from "../../prisma"
import {deleteFunc} from "./deleteAuctionItem" 
export default function ApproveButton({ objectId }: { objectId: number }) {
    async function sendDelete() {
        let response = await deleteFunc(objectId)
        if(response[1]){
            alert("It worked")
        }
        else{
            alert("it no work")
        }
        console.log(response[0])
    } 
    return (
        <div id="buttDiv">
            <button onClick={sendDelete} id="deleteButton">Slett</button>
        </div >
    )
}