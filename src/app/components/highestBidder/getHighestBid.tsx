"use server"
import {prisma } from "../../prisma";  


export async function getHighestBid(objectId: number) {
    const object = await prisma.auksjonsObjekt.findUnique({
        where:{id:objectId},
        select:{
            bids:{
                orderBy: {
                    bidDate:"desc",
                },
                take:1,
                select: {
                    priceOre:true,
                    bidDate:true,
                    bidder: {
                        select:{name:true,},
                    }
                }
            }
        }
    });

    return object?.bids[0] || null;
}