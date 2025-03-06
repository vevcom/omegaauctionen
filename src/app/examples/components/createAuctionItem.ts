"use server"
import { start } from "repl"
import { prisma } from "../../prisma"


export async function createAuctionItem(description:string,name:string,startPrice:number,approved:boolean) {
    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2022-03-25"),
            finalSaleTime: new Date("2022-03-25"),
            description: description,
            name: name,
            startPriceOre: startPrice,
            currentPriceOre: startPrice,
            approved: approved,
            imageName: "default.jpeg"
            
        }
    })
    

}



export async function createAuctionItemFromForm(e: FormData) {
    const testNumber = 3
    let testAppproved = 0
    const startPrice = parseInt(String(e.get("startPris")));
    const name = e.get("name");
    const description = e.get("description");

    if (!startPrice || !name || !description) {
        return -1;
    }

    if (!isNaN(startPrice)) {
        testAppproved++;
    }
    if (typeof (name) === "string") {
        testAppproved++;
    }
    if (typeof(description) === "string") {
        testAppproved++;
    }

    if (!isNaN(startPrice) && typeof (name) === "string" && typeof (description) === "string") {
        await prisma.auksjonsObjekt.create({
            data: {
                currentSaleTime: new Date("2022-03-25"),
                finalSaleTime: new Date("2022-03-25"),
                description: description,
                name: name,
                startPriceOre: parseInt(String(startPrice))*100,
                currentPriceOre: parseInt(String(startPrice))*100,
            }
        })
        return 1
    }
    else{
        return -1
    }
    
}