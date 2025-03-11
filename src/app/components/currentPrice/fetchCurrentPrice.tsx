"use server"

import { prisma } from "@/app/prisma"



export default async function FetchCurrentPrice(objectId:number){
    const auctionObject = await prisma.auksjonsObjekt.findUnique({
        where: { id: objectId },
        select:{
            currentPriceOre: true,
        }
    });
    return auctionObject?.currentPriceOre;
}