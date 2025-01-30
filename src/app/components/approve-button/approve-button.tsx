"use client"
import React, { FormEvent } from "react"
import styles from "./styles.module.css"
import { prisma } from "../../prisma"
import {approve} from "./approveItem" 
export default function ApproveButton({ objectId }: { objectId: number }) {
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
        <div className={styles.buttDiv}>
            <button  onClick={sendApproval} className={styles.approveButton}>Godkjenn</button>
        </div >
    )
}