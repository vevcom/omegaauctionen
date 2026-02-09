"use server"
import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";


export default async function buy_item(saleObjectID: number) {
    const userID = await getUserID()
    if (!userID) {
        return "User not logged in";
    }

    const saleItem = await prisma.auksjonsObjekt.findFirst({
        where: {
            id: saleObjectID,
        },
        select: {
            startPrice: true,
            stock: true,
            currentSaleTime: true
        }
    })

    if (saleItem == null) {
        return "Item not found";
    }

    const hasBought = await prisma.bid.findFirst({
        where: {
            auctionItemId: saleObjectID,
            bidderId: userID
        }
    })

    if (hasBought) {
        return "User has already bought item";
    }

    const now = new Date()
    const openingDate = new Date("2026-03-05T11:00:00.000Z")
    const currentSaleTime = saleItem.currentSaleTime
    if (now > currentSaleTime) {
        return "Sale is over";
    }
    if (now < openingDate) {
        return "Sale not started";
    }


    const dateTimeNow = new Date().toISOString();

    const createResponse = await prisma.bid.create({
        data:{

            bidDate: dateTimeNow,
            price: saleItem.startPrice,
            auctionObject: {
                connect: { id: saleObjectID }
            },
            bidder: {
                connect: { id: userID }
            }
        }
    })

    if (!createResponse){
        return "Bid could not be created";
    }

    await prisma.auksjonsObjekt.update({
        where: {
            id: saleObjectID,
        },
        data: {
            stock: (saleItem.stock - 1)
        }
    })

    return true

}