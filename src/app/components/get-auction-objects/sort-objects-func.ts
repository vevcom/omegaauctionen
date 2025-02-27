"use server"

import { prisma } from "@/app/prisma"

export default async function sortObjectsFunc(auksjonsObjektListe:any[],sortType:string,reverse=false) {
    let sortedList = auksjonsObjektListe
    if (sortType=="price"){
        sortedList = sortedList.sort((a,b)=>a.startPriceInOre -b.startPriceInOre)
    }
    
    
    if (reverse){
        sortedList= sortedList.reverse()
    }

    return sortedList
}