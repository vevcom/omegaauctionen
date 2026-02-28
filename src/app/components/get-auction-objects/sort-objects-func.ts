"use server"

import { $Enums } from "@/generated/client"

type AuksjonsObjekt = {
    currentPrice: number;
    bids: {
        price: number;
    }[];
    _count: {
        bids: number;
    };
    id: number;
    name: string;
    description: string;
    committee: $Enums.Committee;
    type: $Enums.AuksjonsObjektType;
    startPrice: number;
    stock: number;
    finalSaleTime: Date;
    currentSaleTime: Date;
    approved: boolean;
    imageName: string;
    authorId: string | null;
}

export type SortType = "price" | "numberOfBids"

export default async function sortObjectsFunc(auksjonsObjektListe: AuksjonsObjekt[], sortType: SortType | string, reverse = false) {
    let sortedList = auksjonsObjektListe

    switch (sortType) {
        case "price":
            sortedList = sortedList.sort((a, b) => (a.currentPrice-b.currentPrice))
            break;
        case "numberOfBids":
            sortedList = sortedList.sort((a, b) => a._count.bids - b._count.bids)
            break;
        default:
            console.warn("Received unknown sortType: ", sortType)
            break;
    }

    if (reverse) {
        sortedList = sortedList.reverse()
    }

    return sortedList
}