"use server"
import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";
import regUserCourse from "../register-user-course/register-user-course";


export default async function buy_item(saleObjectID: number) {
    const userID = await getUserID()
    if (!userID) {
        return;
    }

    const saleItem = await prisma.auksjonsObjekt.findFirst({
        where: {
            id: saleObjectID,
        },
        select: {
            currentPriceOre: true,
            stock: true,
            currentSaleTime: true
        }
    })

    if (saleItem == null) {
        return;
    }

    const hasBought = await prisma.bid.findFirst({
        where: {
            auctionItemId: saleObjectID,
            bidderId: userID
        }
    })

    if (hasBought) {
        return;
    }

    const now = new Date()
    const openingDate = new Date("2025-03-20T11:00:00.000Z")
    const currentSaleTime = saleItem.currentSaleTime
    if (now > currentSaleTime) {
        return;
    }
    if (now < openingDate) {
        return;
    }


    const dateTimeNow = new Date().toISOString();
    await prisma.bid.create({
        data: {
            bidDate: dateTimeNow,
            priceOre: saleItem.currentPriceOre,
            auctionObject: {
                connect: { id: saleObjectID }
            },
            bidder: {
                connect: { id: userID }
            }
        }
    })
    await prisma.auksjonsObjekt.update({
        where: {
            id: saleObjectID,
        },
        data: {
            stock: (saleItem.stock - 1)
        }
    })
}