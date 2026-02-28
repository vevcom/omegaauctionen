"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma";
import { AuksjonsObjektType } from "@/generated/enums"



export default async function has_bought_cape(object_id: number) {
    //checks if logged in
    const userID = await getUserID()
    if (!userID) {
        return false;
    }
    //tries to find bid on sale item (capes)
    const userBid = await prisma.bid.findFirst({
        where: {
            auctionItemId: object_id,
            bidderId: userID,
            auctionObject : {
                approved:true,
                type: AuksjonsObjektType.SALG,
            }
        }
    })
    if (!userBid) {
        return false
    }
    return true
}