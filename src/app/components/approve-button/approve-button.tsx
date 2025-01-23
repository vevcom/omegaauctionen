"use client"
import React, { FormEvent } from "react"
import "./style.css"
import { prisma } from "../../prisma"
import {approve} from "./approveItem" 
export default function DeleteButton({ objectId }: { objectId: number }) {
    async function sendApproval() {
        let response = await approve(objectId)
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
            <button onClick={sendApproval} id="approveButton">Godkjenn</button>
        </div >
    )
}