"use server"

import { prisma } from "@/app/prisma"
import { get_current_price } from "@/services/auctionObject/actions"
import { AuksjonsObjektType } from "@prisma/client"


// intentional extra split up for easier understanding and for copying parts of code for other potential statists later
export default async function get_money_made(ignoreOverride = false) {
    const overrideObject = await prisma.auksjonsObjekt.findUnique({
        where: {
            special: "OVERRIDE",
        }
    })

    let overrideSum =0
    if (overrideObject){    
        overrideSum = overrideObject.startPrice
    }

    let sum = 0 // initial value
    let moneyMadeOnlineAuction = 0

    //Money made from online auction
    //gets sum of all current prices
    const normalAuctionObjectId = await prisma.auksjonsObjekt.findMany({
        select: {
            id: true,
        },
        where: {
            approved: true,
            type: AuksjonsObjektType.AUKSJON
        }
    })

    if (normalAuctionObjectId) {
        for (const obj in normalAuctionObjectId) {
            const currentPrice = await get_current_price(normalAuctionObjectId[obj].id)
            if (currentPrice) {
                moneyMadeOnlineAuction += currentPrice
            }
        }
    }

    //Money made from capes

    //gets all capes objects(objects typed sale) selects count of bids and current price. So:
    // simplified : [[price, bids] , [price, bids]]
    const capesAuctionObjects = await prisma.auksjonsObjekt.findMany({
        where: {
            approved: true,
            type: AuksjonsObjektType.SALG,
        },
        select: {
            startPrice: true,
            _count: {
                select: {
                    bids: true
                }
            }
        }
    })

    //checks if null
    let moneyMadeCape = 0
    if (!capesAuctionObjects) {
        moneyMadeCape = 0
    }
    else {
        //Product of price of cape and amount of bids
        const moneyPerCapeType = capesAuctionObjects.map((object) => (object.startPrice * object._count.bids))

        //Sum of money made per cape
        moneyMadeCape = moneyPerCapeType.reduceRight((prev, current) => prev + current, 0);
    }

    // Money made from live registration objects. They are identified by containing "DONOTAPPROVE" in their name. 
    // gets sum of all monet made
    const liveRegisteredAuctionObjectsSum = await prisma.auksjonsObjekt.aggregate({
        _sum: {
            stock: true
        },
        where: {
            name: {
                contains: "DONOTAPPROVE"
            },
            approved: false,
        }
    })

    //checks if null
    let moneyMadeLiveRegisteredAuctionObjects
    if (!liveRegisteredAuctionObjectsSum || !liveRegisteredAuctionObjectsSum._sum.stock) {
        moneyMadeLiveRegisteredAuctionObjects = 0
    }
    else {
        moneyMadeLiveRegisteredAuctionObjects = liveRegisteredAuctionObjectsSum._sum.stock
    }

    sum += moneyMadeCape
    sum += moneyMadeOnlineAuction
    sum += moneyMadeLiveRegisteredAuctionObjects

    if (ignoreOverride == true) return sum
    if (overrideSum>sum) return overrideSum

    return sum
}