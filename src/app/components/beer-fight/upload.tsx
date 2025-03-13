"use server"

import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";


export default async function beerToServer (
    {e, object} 
    : 
    {e:FormData, object:string}
) {
    let objectname = "DONOTAPPROVE" + object;
    let pattern = /^[0-9]+$/;
    if (!pattern.test(String(e.get("number")))) {
        alert("Please insert a number");
        return 1;
    }
    let price = Number(e.get("number"));
    const userID = await getUserID();
    if (!userID) {return 1;}
    // checks if a beer exists
    let beerObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: objectname,
        }
    });
    // if this is the first time the beer
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
        });
        return 0;
    }

    await prisma.bid.create({
        data:{
            priceOre: e.get("number")*100,
            auctionItemId:,
            auctionObject:,
            bidDate:"20-03-2025",
            bidderId:,
            bidder:,
        }
    });
    return;
}