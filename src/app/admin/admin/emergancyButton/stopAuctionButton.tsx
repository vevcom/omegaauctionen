"use client"

import { stopAuction } from "./page"


async function handleSubmit(){
    const correctInput = "STOPAUKSJON"
    const confirmInput = prompt("ER DU SIKKER PÅ AT VIL STOPPE AUKSJONEN? SKRIV \""+correctInput+"\"")
    if (confirmInput!=correctInput) return;
    const finalConfirmInput = prompt("ER DU HELT SIKKER? SKRIV \""+correctInput+"\"")
    if (finalConfirmInput!=correctInput) return;
    await stopAuction()
    alert("AUKSJON STENGT")   
}

export function StopButton(){
    return <button onClick={() => handleSubmit()}>Stopp auksjon</button>
}