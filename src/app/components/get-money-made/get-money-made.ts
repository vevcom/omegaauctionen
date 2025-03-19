"use server"

import { prisma } from "@/app/prisma"
import { AuksjonsObjektType } from "@prisma/client"


// intentional extra split up for easier understanding and for copying parts of code for other potential statists later
export default async function get_money_made_in_ore() {
    let sumInOre = 0 // initial value

    //Money made from online auction
    //gets sum of all current prices
    const normalAuctionObjectsSumOre = await prisma.auksjonsObjekt.aggregate({
        _sum: {
            currentPriceOre: true
        },
        where: {
            approved: true,
            type: AuksjonsObjektType.AUKSJON
        }
    })

    //checks if null
    let moneyMadeOnlineAuctionOre = 0
    if (!normalAuctionObjectsSumOre|| !normalAuctionObjectsSumOre._sum.currentPriceOre) {
        moneyMadeOnlineAuctionOre = 0
    }
    else {
        moneyMadeOnlineAuctionOre = normalAuctionObjectsSumOre._sum.currentPriceOre
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
            currentPriceOre: true,
            _count: {
                select: {
                    bids: true
                }
            }
        }
    })

    //checks if null
    let moneyMadeCapeOre = 0
    if (!capesAuctionObjects) {
        moneyMadeCapeOre = 0
    }
    else {
        //Product of price of cape and amount of bids
        const moneyPerCapeTypeOre = capesAuctionObjects.map((object) => (object.currentPriceOre * object._count.bids))

        //Sum of money made per cape
        moneyMadeCapeOre = moneyPerCapeTypeOre.reduceRight((prev, current) => prev + current, 0);
    }

    // Money made from live registration objects. They are identified by containing "DONOTAPPROVE" in their name. 
    // gets sum of all monet made
    const liveRegisteredAuctionObjectsSumOre = await prisma.auksjonsObjekt.aggregate({
        _sum: {
            currentPriceOre: true
        },
        where: {
            name: {
                contains: "DONOTAPPROVE"
            },
            approved: false,
        }
    })

    //checks if null
    let moneyMadeLiveRegisteredAuctionObjectsOre
    if (!liveRegisteredAuctionObjectsSumOre || !liveRegisteredAuctionObjectsSumOre._sum.currentPriceOre) {
        moneyMadeLiveRegisteredAuctionObjectsOre = 0
    }
    else {
        moneyMadeLiveRegisteredAuctionObjectsOre = liveRegisteredAuctionObjectsSumOre._sum.currentPriceOre
    }

    sumInOre += moneyMadeCapeOre
    sumInOre += moneyMadeOnlineAuctionOre
    sumInOre += moneyMadeLiveRegisteredAuctionObjectsOre

    return sumInOre
}