"use server"

import { prisma } from "@/app/prisma"



export async function get_current_price(auctionItemId: number) {
    const currentPrice = await prisma.bid.aggregate({ //get highest bid value
        where: {
            auctionItemId: auctionItemId,
        },
        _max: {
            price: true,
        }
    })
    const highestBid = currentPrice._max.price
    if (highestBid != null) {
        return highestBid
    }

    const startPrice = await prisma.auksjonsObjekt.findUnique({
        where: {
            id: auctionItemId,
        },
        select: {
            startPrice: true,
        }
    })
    if (!startPrice) {
        return;
    }
    return startPrice.startPrice
}