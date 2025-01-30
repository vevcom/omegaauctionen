"use server"

import { prisma } from "../prisma";


export async function createAuctionItemFromForm(e: FormData) {
    if ((typeof (parseInt(e.get("startPriceInKroner") as string)) === "number") == false) {
        return false;
    }
    if (((typeof (e.get("name")) === "string")) == false && e.get("name") != "") {
        return false;
    }
    if (((typeof (e.get("descripton")) === "string")) == false && e.get("name") != "") {
        return false;
    }

    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2022-03-25"),
            finalSaleTime: new Date("2022-03-25"),
            description: e.get("descripton") as string,
            name: e.get("name") as string,
            startPriceOre: parseInt(e.get("startPriceInOre") as string) * 100,
        }
    })

    return true;
}