"use server"

import { Prisma } from "@prisma/client"

type AuksjonsObjekt = Prisma.AuksjonsObjektGetPayload<{ include: { _count: { select: { bids: true } } } }>
export type SortType = "price" | "numberOfBids"

export default async function sortObjectsFunc(auksjonsObjektListe: AuksjonsObjekt[], sortType: SortType | string, reverse=false) {
    let sortedList = auksjonsObjektListe

    switch (sortType) {
        case "price":
            sortedList = sortedList.sort((a,b)=> a.currentPriceOre - b.currentPriceOre)
            break;
        case "numberOfBids":
            sortedList = sortedList.sort((a,b)=> a._count.bids - b._count.bids)
            break;
        default:
            console.warn("Received unknown sortType: ", sortType)
            break;
    }
    
    if (reverse){
        sortedList = sortedList.reverse()
    }

    return sortedList
}