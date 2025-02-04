"use client"
import React, { FormEvent } from "react"
import styles from "./style.module.scss"
import { prisma } from "../../prisma"
import {deleteFunc} from "./deleteAuctionItem" 
export default function deleteButton({ objectId }: { objectId: number }) {
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
        <div className={styles.buttDiv}>
            <button  className={styles.delteButton} onClick={sendDelete} id="deleteButton">Slett</button>
        </div >
    )
}