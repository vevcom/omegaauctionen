"use server"
import { prisma } from "../../prisma"


export async function createAuctionItem(description:string,name:string,startPrice:number,approved:boolean) {
    await prisma.auksjonsObjekt.create({
        data: {
            currentSaleTime: new Date("2022-03-25"),
            finalSaleTime: new Date("2022-03-25"),
            description: description,
            name: name,
            startPriceOre: startPrice,
            approved: approved,
            imageName: "default.jpeg"

        }
    })
    

}



export async function createAuctionItemFromForm(e: FormData) {
    const testNumber = 3
    let testAppproved = 0

    if (typeof (parseInt(e.get("startPris"))) === "number") {
        testAppproved++;
    }
    if (typeof (e.get("name")) === "string") {
        testAppproved++;
    }
    if (typeof (e.get("descripton")) === "string") {
        testAppproved++;
    }

    if (testAppproved == testNumber) {
        await prisma.auksjonsObjekt.create({
            data: {
                currentSaleTime: new Date("2022-03-25"),
                finalSaleTime: new Date("2022-03-25"),
                description: e.get("descripton"),
                name: e.get("name"),
                startPriceOre: parseInt(e.get("startPris"))*100,
            }
        })
        return 1
    }
    else{
        return -1
    }
    
}