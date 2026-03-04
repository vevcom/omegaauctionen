"use client"

import { auctionFinalEnd, auctionNormalEnd } from "@/app/timeCheck/timeCheck"
import { useState } from "react"
import { setNewTime } from "./page"



async function handleSubmit(newDateTimeNormal:Date,newDateTimeFinal:Date) {
    const confirmCorrectInput = "ENDRETID" 
    const confirmInput = prompt("Er du sikker på at du vil endre ALLE tidene? Skriv \""+confirmCorrectInput+"\"")
    if (confirmCorrectInput!==confirmInput) return;
    await setNewTime(newDateTimeNormal,newDateTimeFinal)
}


export function TimeSetPanel() {
    const [newTimeNormalInput, setNewTimeNormalInput] = useState("")
    const [newTimeFinalInput, setNewTimeFinalInput] = useState("")

    const newNormalTimeAsDate = new Date(newTimeNormalInput)
    const newFinalTimeAsDate = new Date(newTimeFinalInput)

    const resultNormal = (newNormalTimeAsDate.toLocaleString("en-GB") == auctionNormalEnd.toLocaleString("en-GB"))
    const resultFinal = (newFinalTimeAsDate.toLocaleString("en-GB") == auctionFinalEnd.toLocaleString("en-GB"))

    return (
        <div>
            <h1>TESTER BASERT PÅ NÅVÆRENDE TIDSSONER</h1>
            <p>Stemmer med tiden satt i timeCheck.ts?</p>
            <p>Normal test: {resultNormal ? "Pass" : "Fail"}</p>
            <p>Final test: {resultFinal ? "Pass" : "Fail"}</p>
            <label> Normal
                <input onChange={(e) => (setNewTimeNormalInput(e.target.value))}></input>
            </label>
            <label> Final
                <input onChange={(e) => (setNewTimeFinalInput(e.target.value))}></input>
            </label>
            <button onClick={() => (handleSubmit(newNormalTimeAsDate,newFinalTimeAsDate))}>Send</button>
            <h3>HINT: 2026-03-05T23:00:00.000 er en fin formatering. Stor Z på enden gir zulu-tid</h3>
            <p>Du har skrevet / nåværende tid satt i timeCheck.ts. (I LOKAL TIDSSONE)</p>
            <p>{newNormalTimeAsDate.toLocaleString("en-GB")} / {auctionNormalEnd.toLocaleString("en-GB")}</p>
            <p>{newFinalTimeAsDate.toLocaleString("en-GB")} / {auctionFinalEnd.toLocaleString("en-GB")}</p>
        </div>
    )
}
