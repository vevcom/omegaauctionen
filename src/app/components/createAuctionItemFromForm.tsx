"use server"

import { prisma } from "../prisma";


export async function createAuctionItemFromForm(e: FormData) {
    if (((typeof (parseInt(e.get("startPriceInKroner") as string)) === "number") == false) || ((e.get("startPriceInKroner") as string) == "")|| parseInt(e.get("startPriceInKroner") as string)<0) {
        return false;
    }
    if ((((typeof (e.get("name")) === "string")) == false) || (e.get("name") == ""))  {
        return false;
    }
    if((((typeof (e.get("descripton")) === "string")) == false) || (e.get("descripton") == "")) {
        return false;
    }
    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2026-03-05T22:00:00.000Z"),
            finalSaleTime: new Date("2026-03-05T22:30:00.000Z"),
            description: e.get("descripton") as string,
            name: e.get("name") as string,
            startPrice: parseInt(e.get("startPriceInKroner") as string),
            imageName:e.get("imageFileName") as string,
            author:{
                connect: {id : (e.get("userById") as string)}
            }
        }
    })

    return true;
}
