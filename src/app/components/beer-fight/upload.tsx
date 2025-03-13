"use server"

import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";
import { connect } from "http2";


export default async function beerToServer (
    {e, object} 
    : 
    {e:FormData, object:string}
) {
    let objectname = "DONOTAPPROVE" + object;
    let pattern = /^[0-9]+$/;
    if (!pattern.test(String(e.get("number")))) {
        console.log("error: number missing")
        return 1;
    }
    let price = Number(e.get("number"))*100;
    const userID = await getUserID();
    if (!userID) {
        console.log("Not logged in")
        return 1;
    }
    // checks if a beer exists
    let beerObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: objectname,
        }
    });
    // if this is the first time the beer object is being created, run this
    if (!beerObject) {
        beerObject = await prisma.auksjonsObjekt.create({
            data: {
                description: "DONOTAPPROVE",
                name: objectname,
                startPriceOre: price,
                currentPriceOre: price,
                approved: false,
                stock: 0,
                
            }
        })
        if (!beerObject) {
            console.log("unable to create beerObject");
            return 1;
        }
    }
    else {
        let newprice = price + beerObject.currentPriceOre;
        prisma.auksjonsObjekt.update({
            where: {id:beerObject.id},
            data: {
                currentPriceOre:newprice,
                startPriceOre:newprice
            }
        })
    }
    const bud = await prisma.bid.create({
        data: {
            priceOre:price,
            auctionObject:{
                connect:{
                    id:beerObject.id,
                }
            },
            bidder:{
                connect:{
                    id:userID,
                }
            },
        }
    });
    if (!bud) {
        console.log("Could not create bid")
        return 1;
    }
    return 0;
}