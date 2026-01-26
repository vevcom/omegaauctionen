"use server"
import { prisma } from "../../prisma";


export async function getHighestBid(objectId: number) {
    const object = await prisma.auksjonsObjekt.findFirst({
        where: { id: objectId },
        select: {
            bids: {
                orderBy: {
                    bidDate: "desc",
                },
                take: 3,
                select: {
                    price: true,
                    bidDate: true,
                    bidder: {
                        select: {
                            name: true,
                        },
                    }
                }
            }
        }
    });
    if ( !object || object.bids.length==0){
        return null
    }
    return object.bids;
}